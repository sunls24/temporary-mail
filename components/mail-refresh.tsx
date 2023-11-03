"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { refreshSeconds } from "@/lib/constant";
import { useEnvelope } from "@/lib/store/envelope";
import { useConfig } from "@/lib/store/config";
import { useToast } from "@/components/ui/use-toast";

function MailRefresh() {
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [loading, setLoading] = useState(false);
  const setEnvelope = useEnvelope((state) => state.setEnvelope);
  const config = useConfig();
  const { toast } = useToast();

  useEffect(() => {
    const timerId = setTimeout(
      async () => {
        if (seconds >= refreshSeconds - 1 || !timer) {
          await onRefresh();
          return;
        }
        setSeconds(seconds + 1);
      },
      timer ? 1000 : 0,
    );
    setTimer(timerId);
    return () => clearTimeout(timerId);
  }, [seconds]);

  async function onRefresh() {
    if (loading) {
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }
    setLoading(true);
    try {
      const res = await (
        await fetch(`/api/mail?to=${config.mail}${config.domain}`)
      ).json();
      if (res.error) {
        throw new Error(res.error);
      }
      setEnvelope(res);
    } catch (e: any) {
      toast({ description: e.message, variant: "destructive" });
    } finally {
      setSeconds((seconds) => (seconds === 0 ? 1 : 0));
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <RefreshCw size={20} className="mr-6 animate-spin " />
      ) : (
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw size={16} className="mr-1" />
          刷新
        </Button>
      )}
      <span className="self-end pb-0.5 text-sm text-muted-foreground">
        将在
        <span className="font-medium">{refreshSeconds - seconds}s</span>
        后自动刷新
      </span>
    </>
  );
}

export default MailRefresh;
