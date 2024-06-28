import React from "react";
import Script from "next/script";
import { unstable_noStore as noStore } from "next/cache";

function Umami() {
  noStore();
  if (!process.env.UMAMI_ID) {
    return;
  }
  return (
    <Script
      id="umami"
      strategy="afterInteractive"
      src={process.env.UMAMI_URL}
      data-website-id={process.env.UMAMI_ID}
      data-domains={process.env.UMAMI_DOMAINS}
    />
  );
}

export default Umami;
