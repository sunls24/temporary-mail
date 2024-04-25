import { NextRequest, NextResponse } from "next/server";
import { fetchLast10Day } from "@/app/api/fetch";

export async function GET(req: NextRequest) {
  // No need to execute fetch* when packaging (don't know why, but it works)
  req.headers.get("host");
  try {
    const data = await fetchLast10Day();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
