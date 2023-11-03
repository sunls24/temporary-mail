"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { refreshSeconds } from "@/lib/constant";

function MailRefresh() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      if (seconds >= refreshSeconds - 1) {
        onRefresh();
        return;
      }
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [seconds]);

  function onRefresh() {
    console.log("refresh");
    setSeconds(0);
  }

  return (
    <>
      <Button variant="outline" onClick={onRefresh}>
        <RefreshCw size={16} className="mr-1" />
        刷新
      </Button>
      <span className="self-end pb-0.5 text-sm text-muted-foreground">
        将在
        <span className="font-medium">{refreshSeconds - seconds}s</span>
        后自动刷新
      </span>
    </>
  );
}

export default MailRefresh;
