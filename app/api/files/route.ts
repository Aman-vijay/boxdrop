import {db} from "@lib/db";
import {files} from "@lib/db/schema";
import {auth} from "@clerk/nextjs/server";
import {eq, and,isNull} from "drizzle-orm";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    try{
        const {userId} = await auth();
        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const searchParams = request.nextUrl.searchParams;
        const queryUserId = searchParams.get("userId");
        const parentId = searchParams.get("parentId");

        if(!queryUserId || queryUserId !== userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        //Fetch files from db for the user
        let userFiles;
        if(parentId){
            //Fetch folder
            userFiles = await db.
                            select().from(files).where(
                                and(
                                    eq(files.userId,userId),
                                    eq(files.parentId,parentId)
                                )
                            )
        }
        else{
            await db.select().from(files).where(and(
                eq(files.userId,userId),
                isNull(files.parentId)
            ))

        }

        return NextResponse.json({ message: "Files created successfully" }), {
                success: true,
                status: 201,
                message: "Files created successfully",
                folder: userFiles,
            };
    }
    catch (error) {
        console.error("Error fetching files:", error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}