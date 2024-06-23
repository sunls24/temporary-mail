import { NextRequest, NextResponse } from "next/server";
import { fetchOne } from "@/app/api/fetch";

export async function GET(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");
    if (!key) {
      return NextResponse.json({ error: "no email key" }, { status: 400 });
    }
    const html = await fetchOne(key);
    return NextResponse.json({ __html: html });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
