import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useConfig } from "@/lib/store/config";
import { Button } from "@/components/ui/button";
import { Eraser, MailQuestion, Trash } from "lucide-react";
import { toast } from "sonner";

function MailHistory({
  onChange,
  children,
}: {
  onChange: (mail: string, domain: string) => void;
  children: React.ReactNode;
}) {
  const [history, clearHistory] = useConfig((state) => [
    state.history,
    state.clearHistory,
  ]);

  function onChangeClick(value: string, index: number) {
    setOpen(false);
    setTimeout(() => {
      clearHistory(index);
      const [mail, domain] = value.split("@");
      onChange(mail, "@" + domain);
    }, 100);
  }

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        {history.length === 0 ? (
          <div className="flex items-center gap-1 p-3 text-sm text-muted-foreground">
            <MailQuestion size={18} strokeWidth={1.8} />
            这里什么也没有
          </div>
        ) : (
          <>
            <div className="flex max-h-96 flex-col overflow-auto border-b p-2">
              {history.map((value, index) => (
                <div key={index}>
                  <div className="flex items-center gap-1 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                    <div
                      className="cursor-pointer"
                      onClick={() => onChangeClick(value, index)}
                    >
                      {value}
                    </div>
                    <div className="flex-1" />
                    <Trash
                      size={16}
                      onClick={() => clearHistory(index)}
                      className="cursor-pointer hover:text-destructive"
                    />
                  </div>
                  {index < history.length - 1 && (
                    <div className="mx-auto my-1 h-[1px] w-[95%] bg-border" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex bg-secondary p-2">
              <div className="flex-1" />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setOpen(false);
                  setTimeout(clearHistory, 100);
                  toast.success("已清空所有历史纪录");
                }}
              >
                <Eraser size={14} className="mr-1" />
                清空历史
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default MailHistory;
