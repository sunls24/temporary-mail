import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Envelope } from "@/lib/types";
import { fmtLocaleTime } from "@/lib/utils";

const loadingHtml = `<style>.lds-ellipsis{display:inline-block;position:relative;width:76px;height:50px}.lds-ellipsis div{position:absolute;top:20px;width:13px;height:13px;border-radius:50%;animation-timing-function:cubic-bezier(0,1,1,0)}.lds-ellipsis div:nth-child(1){left:8px;animation:lds-ellipsis1 0.6s infinite}.lds-ellipsis div:nth-child(2){left:8px;animation:lds-ellipsis2 0.6s infinite}.lds-ellipsis div:nth-child(3){left:32px;animation:lds-ellipsis2 0.6s infinite}.lds-ellipsis div:nth-child(4){left:56px;animation:lds-ellipsis3 0.6s infinite}@keyframes lds-ellipsis1{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes lds-ellipsis3{0%{transform:scale(1)}100%{transform:scale(0)}}@keyframes lds-ellipsis2{0%{transform:translate(0,0)}100%{transform:translate(24px,0)}}</style>
<div class="h-full flex justify-center items-center">
  <div class="lds-ellipsis [&>div]:bg-primary/90"><div></div><div></div><div></div><div></div></div>
</div>`;

function MailDetail({
  children,
  envelope,
}: {
  children: ReactNode;
  envelope: Envelope;
}) {
  const { toast } = useToast();
  const [controller, setController] = useState<AbortController>();
  const [html, setHtml] = useState<{ __html: string }>();

  async function onOpenChange(open: boolean) {
    if (!open) {
      controller?.abort();
      setHtml({ __html: "" });
      return;
    }
    try {
      const controller = new AbortController();
      setController(controller);
      setHtml({ __html: loadingHtml });
      const res = await (
        await fetch(`/api/detail?uid=${envelope.uid}`, {
          signal: controller.signal,
        })
      ).json();
      if (res.error) {
        throw new Error(res.error);
      }
      setHtml(res);
    } catch (e: any) {
      if (e.message !== "The user aborted a request.") {
        toast({ description: e.message, variant: "destructive" });
      }
    }
  }
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{envelope.subject}</DialogTitle>
          <DialogDescription className="flex flex-col justify-between sm:flex-row">
            <span>
              {envelope.from.name} {`<${envelope.from.address}>`}
            </span>
            {fmtLocaleTime(new Date(envelope.date))}
          </DialogDescription>
        </DialogHeader>
        <div
          dangerouslySetInnerHTML={html}
          className="max-h-[70vh] min-h-[108px] overflow-auto border-t pt-2"
        />
      </DialogContent>
    </Dialog>
  );
}

export default MailDetail;
