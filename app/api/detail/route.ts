import { NextRequest, NextResponse } from "next/server";
import { fetchOne } from "@/app/api/fetch";
import { simpleParser } from "mailparser";

export async function GET(req: NextRequest) {
  try {
    const uid = req.nextUrl.searchParams.get("uid");
    if (!uid) {
      return NextResponse.json({ error: "no email uid" }, { status: 400 });
    }
    const mail = await fetchOne(uid);
    const parsed = await simpleParser(Buffer.from(mail.source));
    return NextResponse.json({ __html: parsed.html });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
