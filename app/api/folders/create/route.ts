import  {db }from "@/lib/db";
import {files} from "@/lib/db/schema";
import{auth} from "@clerk/nextjs/server";
import {eq,and} from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import {v4 as uuidv4} from "uuid";

export async function POST(request:NextRequest){
    try{
        const {userId} = await auth();
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const body = await request.json();
        const {name,userId:bodyUserId, parentId=null} = body;
        if(bodyUserId !== userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if(!name || typeof name !== "string" || name.trim() === ""){
            return new NextResponse("Invalid request body", { status: 400 });
        }
        //Check if parentId exists and is a valid folder
        if(parentId ){
            const[parentFolder]=await db.select().from(files).where(and (
                eq(files.id, parentId),
                eq(files.userId, userId),
                eq(files.isFolder, true)
            ));
 if(parentId && !parentFolder){
            return new NextResponse("Parent folder not found or unauthorized", { status: 404 });
        }

            }

            //Create new folder
            const folderData = {
                 id:uuidv4(),
                 name: name.trim(),
                 path: `/folders/${userId}/ ${uuidv4()}`,
                 size: 0,
                 type: "folder",
                 fileUrl:"",
                 thumbnailUrl: null,
                     userId,
                    parentId,
                    isFolder: true,
                    isStarred: false,
                    isTrash: false,

            }

           const[newFolder]= await db.insert(files).values(folderData).returning();
            return NextResponse.json({ message: "Folder created successfully" }), {
                success: true,
                status: 201,
                message: "Folder created successfully",
                folder: newFolder,
            };
       
        // Check if folder already exists
        }      
    catch(error){
        console.error("Error in POST /folders:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

