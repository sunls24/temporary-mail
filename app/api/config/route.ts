import { NextRequest, NextResponse } from "next/server";
import { DOMAIN_LIST_SERVER } from "@/lib/constant";
import { ConfigServer } from "@/lib/store/config-server";

export async function GET(req: NextRequest) {
  const config: ConfigServer = { domain: DOMAIN_LIST_SERVER };
  return NextResponse.json(config);
}
