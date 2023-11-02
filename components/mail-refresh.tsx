import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

function MailRefresh() {
  return (
    <>
      <Button variant="outline">
        <RefreshCw size={16} className="mr-1" />
        刷新
      </Button>
      <span className="self-end pb-0.5 text-sm text-muted-foreground">
        将在3s后自动刷新
      </span>
    </>
  );
}

export default MailRefresh;
