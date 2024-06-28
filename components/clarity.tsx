import React from "react";
import Script from "next/script";
import { unstable_noStore as noStore } from "next/cache";

function Clarity() {
  noStore();
  if (!process.env.MICROSOFT_CLARITY) {
    return;
  }
  return (
    <Script
      id="microsoft-clarity-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${process.env.MICROSOFT_CLARITY}");`,
      }}
    />
  );
}

export default Clarity;
