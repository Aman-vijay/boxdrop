import {db} from "@/lib/db";
import {files} from "@/lib/db/schema"
import { auth } from "@clerk/nextjs/server";
import { NextRequest,NextResponse } from "next/server";
import {eq,and} from "drizzle-orm";
import ImageKit from "imagekit";
import {v4 as uuidv4} from "uuid"



  const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function POST(request:NextRequest){
  
try{
    //Authorization
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({ error: "Unauthorized"},{status:401});
    }
    //Parse form data
    const formData = await request.formData()
    const file=formData.get("file") as File
    const formUserId=formData.get("userId") as string
    const parentId = formData.get("parentId") as string || null

    //Match it with userId

    if(formUserId!==userId){
         return NextResponse.json({ error: "Unauthorized"},{status:401});
      
    }
    if(!file){
        return NextResponse.json({error:"No file provided by the user"},{status:400});
    }

   if (parentId) {
  const parentFolder = await db
    .select()
    .from(files)
    .where(and(
      eq(files.id, parentId),
      eq(files.userId, userId),
      eq(files.isFolder, true)
    ));
if (parentFolder.length === 0) {
        return NextResponse.json(
          { error: "Parent folder not found or not accessible" },
          { status: 404 }
        );
      }
    }


    //Check the file type
   if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF and image files are supported" },
        { status: 400 }
      );
    }

     // 5. Size limit
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max allowed is 5MB" },
        { status: 400 }
      );
    }

    //Creating buffer of file
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const folderPath = parentId? `/boxdrop/${userId}/folder/${parentId}`:`/boxdrop/${userId}`
    const originalFileName = file.name;
    const sanitizedFileName = originalFileName.replace(/[^a-zA-Z0-9.\-_]/g, "_").slice(0, 100);

    const fileExtension = sanitizedFileName.split(".").pop() || ""
    const uniqueFileName = `${uuidv4()}.${fileExtension }`
   

    //upload to imageKit

   let uploadRes;
try {
  uploadRes = await imagekit.upload({
    file: fileBuffer,
    fileName: uniqueFileName,
    folder: folderPath,
    useUniqueFileName: false,
  });
} catch (err) {
  console.error("ImageKit upload failed", err);
  return NextResponse.json({ error: "Upload to ImageKit failed" }, { status: 502 });
}


    const fileData = {
        name:originalFileName,
        path:uploadRes.filePath,
        size:file.size,
        type:file.type,
         fileUrl: uploadRes.url,
        thumbnailUrl: uploadRes.thumbnailUrl || null,
        userId: userId,
        parentId: parentId , 
        isFolder: false,
        isStarred: false,
        isTrash: false,


    }

   const [newFile]= await db.insert(files).values(fileData).returning();
   return NextResponse.json(newFile);


}
catch(error){
    console.error("Error fetching files",error)
    return new NextResponse("Internal Server Error",{status:500})
}
}