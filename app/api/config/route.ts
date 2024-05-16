import { NextRequest, NextResponse } from "next/server";
import { ConfigServer } from "@/lib/store/config-server";
import { getDomainList } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(req: NextRequest) {
  noStore();
  const config: ConfigServer = {
    domain: getDomainList(),
    clarity: process.env.MICROSOFT_CLARITY,
  };
  return NextResponse.json(config);
}
