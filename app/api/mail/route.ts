import { NextRequest, NextResponse } from "next/server";
import { fetchLast } from "@/app/api/fetch";

export async function GET(req: NextRequest) {
  try {
    const to = req.nextUrl.searchParams.get("to");
    if (!to) {
      return NextResponse.json({ error: "no email address" }, { status: 400 });
    }
    const mailList = await fetchLast({ to });
    return NextResponse.json(mailList);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
