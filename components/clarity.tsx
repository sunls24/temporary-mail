"use client";
import React from "react";
import Script from "next/script";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { configServerStore } from "@/lib/store/config-server";

function Clarity() {
  const server = useStoreWithEqualityFn(configServerStore);
  if (!server.clarity) {
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
    })(window, document, "clarity", "script", "${server.clarity}");`,
      }}
    />
  );
}

export default Clarity;
