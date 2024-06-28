import { NextRequest, NextResponse } from "next/server";
import { ConfigServer } from "@/lib/store/config-server";
import { unstable_noStore as noStore } from "next/cache";
import { getDomainList } from "@/lib/utils";

export async function GET(req: NextRequest) {
  noStore();
  const config: ConfigServer = {
    domain: getDomainList(),
  };
  return NextResponse.json(config);
}
