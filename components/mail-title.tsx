"use client";
import React from "react";
import Mounted from "@/components/mounted";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { useConfig } from "@/lib/store/config";
import { toast } from "sonner";

function MailTitle() {
  const config = useConfig();

  function onCopy() {
    navigator.clipboard
      .writeText(config.mail + config.domain)
      .then(() =>
        toast.success("已拷贝至剪切板 " + config.mail + config.domain),
      )
      .catch((e) => toast.error(`出错啦: ${e.message}`));
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
