import { NextRequest, NextResponse } from "next/server";
import { fetchLast } from "@/app/api/mail/fetch";

export async function GET(req: NextRequest) {
  try {
    const to = req.nextUrl.searchParams.get("to");
    if (!to) {
      return new NextResponse("not set address");
    }
    const mailList = await fetchLast({
      to,
      // since: new Date(new Date().getTime() - 600000),
    });
    return NextResponse.json(mailList);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
