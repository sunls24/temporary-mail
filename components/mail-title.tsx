"use client";
import React from "react";
import Mounted from "@/components/mounted";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { useConfig } from "@/lib/store/config";
import { useToast } from "@/components/ui/use-toast";

function MailTitle() {
  const config = useConfig();
  const { toast } = useToast();

  function onCopy() {
    navigator.clipboard
      .writeText(config.mail + config.domain)
      .then(() => toast({ description: "已拷贝至剪切板" }))
      .catch((e) =>
        toast({ variant: "destructive", description: `出错啦: ${e.message}` }),
      );
  }
  return (
    <div className="flex items-center gap-1">
      <Mounted fallback={<Skeleton className="h-7 w-40" />}>
        <span className="font-medium">
          {config.mail}
          {config.domain}
        </span>
      </Mounted>
      <Button variant="ghost" size="icon" onClick={onCopy}>
        <ClipboardCopy size={20} strokeWidth={1.8} />
      </Button>
    </div>
  );
}

export default MailTitle;
