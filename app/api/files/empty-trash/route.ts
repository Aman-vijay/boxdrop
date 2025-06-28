import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import ImageKit from "imagekit";
import {  NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export  async function DELETE(){
    try{
        const {userId} = await auth();
         if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    

    const trashFile = await db.select().from(files).where(and(
        eq(files.userId,userId),
        eq(files.isTrash,true)
    ))

    if(trashFile.length ===0){
         return NextResponse.json(
      { error: "No trash file found" },
      { status: 200 }
    );
    }
    //To delete file from imageKit
    const deletePromises  =trashFile.filter((file)=>!file.isFolder)
    .map(async(file)=>{
        try{
            let imageKitFileId = null;
            if(file.fileUrl){
                const urlWithoutQuery=file.fileUrl.split("?")[0];
                imageKitFileId = urlWithoutQuery.split("/").pop()
            }
            if(!imageKitFileId && file.path ){
                imageKitFileId = file.path.split("/").pop();
            }

            if(imageKitFileId){
                try{
                    const searchResults = await imagekit.listFiles({
                        name:imageKitFileId,
                        limit:1,
                    });

                    if(searchResults && searchResults.length>0){
                        const found = searchResults[0];
                        if('fileId' in found && typeof found.fileId ==='string'){
                            await imagekit.deleteFile(found.fileId);

                        }
                        else{
                            await imagekit.deleteFile(imageKitFileId)
                        }
                    }
                    else{
                        await imagekit.deleteFile(imageKitFileId);
                    }
                }
                catch(searchError){
                     console.error(`Error searching for file in ImageKit:`, searchError);
            await imagekit.deleteFile(imageKitFileId);

                }
            }

        }
        catch(error){
            console.error(`Error deleting the file ${file.id} from ImageKit:`, error  )
        }

    })
await Promise.allSettled(deletePromises);
const deletedFiles  = await db.delete(files).where(and(
    eq(files.userId,userId),
    eq(files.isTrash,true)
)).returning();

return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deletedFiles.length} files from trash`,
    })


    }

    
    catch (error) {
    console.error("Error emptying trash:", error);
    return NextResponse.json(
      { error: "Failed to empty trash" },
      { status: 500 }
    );
}
}