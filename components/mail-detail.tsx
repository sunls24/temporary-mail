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

const loadingHtml =
  '<div class="h-40 flex justify-center items-center font-medium">拼命加载中 ...</div>';

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
          className="max-h-[70vh] overflow-auto border-t"
        />
      </DialogContent>
    </Dialog>
  );
}

export default MailDetail;
