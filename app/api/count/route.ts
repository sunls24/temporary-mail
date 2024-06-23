import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { fetchLast10Day } from "@/app/api/fetch";

export async function GET(req: NextRequest) {
  noStore();
  try {
    const data = await fetchLast10Day();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
