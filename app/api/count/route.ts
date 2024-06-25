import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { fetchCount } from "@/app/api/fetch";

export async function GET(req: NextRequest) {
  noStore();
  try {
    const data = await fetchCount();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
