import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function DELETE(request:NextRequest, props:{params:Promise<{fileId:string}>}) {
    try {
        const {userId}  = await auth();
        if(!userId){
                return NextResponse.json({error:"Unauthorized"},{status:401})
            }
        const {fileId} = await props.params;
         if(!fileId){
            return NextResponse.json({error:"File id is required"},{status:400})
           }
           const [file] = await db.select().from(files).where(
            and(
                eq(files.id,fileId),
                eq(files.userId,userId)
    
            )
           )
    
           if(!file){
            return NextResponse.json({error:"File not found"},{status:404})
           }

           // Delete file from ImageKit if it's not a folder
           if(!file.isFolder){
            try{
            let imageKitFileId = null;
            if (file.fileUrl){
                const urlWithoutQuery = file.fileUrl.split("?")[0];
                imageKitFileId = urlWithoutQuery.split("/").pop();
            }
            
                if (!imageKitFileId && file.path) {
                imageKitFileId = file.path.split("/").pop();
                }

               if (imageKitFileId) {
          try {
            const searchResults = await imagekit.listFiles({
              name: imageKitFileId,
              limit: 1,
            });

            if (searchResults && searchResults.length > 0) {
              const found = searchResults[0];
              if ('fileId' in found && typeof found.fileId === 'string') {
                await imagekit.deleteFile(found.fileId);
              } else {
                await imagekit.deleteFile(imageKitFileId);
              }
            } else {
              await imagekit.deleteFile(imageKitFileId);
            }
          } catch (searchError) {
            console.error(`Error searching for file in ImageKit:`, searchError);
            await imagekit.deleteFile(imageKitFileId);
          }
        }


            }
            catch(error){
                console.error(`Error deleting the file ${fileId} from ImageKit:`, error  )
            }
           }
    
           //Delete the file
           const [deletedFile] = await db.delete(files).where(and(
              eq(files.id,fileId),
                eq(files.userId,userId)
    
           )).returning();

          return NextResponse.json({
      success: true,
      message: "File deleted successfully",
      deletedFile,
    });
    
    } catch (error) {
        console.error("Error deleting the file",error);
        return NextResponse.json({error:"Error deleting the file"},{status:500})
        
    }
       

    
}