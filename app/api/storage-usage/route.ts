import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { sum, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// 50 MB limit
const MAX_USER_STORAGE_BYTES = 50 * 1024 * 1024;

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the sum of file sizes for this user
    const [usageResult] = await db
      .select({ used: sum(files.size) })
      .from(files)
      .where(eq(files.userId, userId));

    console.log("Storage usage result:", usageResult);

    const usedRaw = usageResult?.used ?? 0;
    const used = typeof usedRaw === "bigint" ? Number(usedRaw) : usedRaw;

    return NextResponse.json({
      used,
      limit: MAX_USER_STORAGE_BYTES,
      remaining: Math.max(0, MAX_USER_STORAGE_BYTES - Number(used)),
    });
  } catch (error) {
    console.error("Failed to fetch storage usage:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
