import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import {files} from "@/lib/db/schema";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try{
        const {userId} = await auth();
        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }
        const body = await request.json();
        const{imagekit,userId:bodyUserId} = body;
        if(bodyUserId !== userId){
            return new Response("Unauthorized", { status: 401 });
        }
        if(!imagekit || !imagekit.fileId || !imagekit.url) {
            return new Response("Invalid request body", { status: 400 });
        }

        const fileData = {
          name: imagekit.name || "Untitled",
      path: imagekit.filePath || `/droply/${userId}/${imagekit.name}`,
      size: imagekit.size || 0,
      type: imagekit.fileType || "image",
      fileUrl: imagekit.url,
      thumbnailUrl: imagekit.thumbnailUrl || null,
      userId: userId,
      parentId: null, // Root level by default
      isFolder: false,
      isStarred: false,
      isTrash: false,
        }

        const [newfile] = await db.insert(files).values(fileData).returning();
        return new Response(JSON.stringify(newfile), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    catch (error) {
        console.error("Error in POST /upload:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

}