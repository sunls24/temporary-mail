"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { DELIMITER, REFRESH_SECONDS } from "@/lib/constant";
import { useEnvelope } from "@/lib/store/envelope";
import { useConfig } from "@/lib/store/config";
import { emitter, mittKey } from "@/lib/mitt";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

function MailRefresh() {
  const t = useTranslations();
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [loading, setLoading] = useState(false);
  const setEnvelope = useEnvelope((state) => state.setEnvelope);
  const mailAddress = useConfig((state) => state.mail + state.domain);

  useEffect(() => {
    emitter.on(mittKey.REFRESH, onRefresh);
    return () => emitter.off(mittKey.REFRESH, onRefresh);
  }, [mailAddress]);

  useEffect(() => {
    const timerId = setTimeout(
      async () => {
        if (seconds >= REFRESH_SECONDS - 1 || !timer) {
          setTimeout(
            () => emitter.emit(mittKey.REFRESH),
            mailAddress.includes("@") ? 0 : 50,
          );
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
      const res = await fetch(`/api/mail?to=${mailAddress}`);
      const list = await res.json();
      if (list.error) {
        throw new Error(list.error);
      }

      const admin = res.headers.get("admin");
      setEnvelope(
        list.map((key: string) => {
          const [fromName, fromAddress, subject, date] = atob(
            key.split(DELIMITER)[2],
          ).split(DELIMITER);
          return {
            key,
            fromName: decodeURIComponent(fromName),
            fromAddress,
            subject: decodeURIComponent(subject),
            date,
          };
        }),
        admin === "true",
      );
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSeconds((seconds) => (seconds === 0 ? 1 : 0));
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <RefreshCw size={20} className="mr-6 animate-spin" />
      ) : (
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw size={16} className="mr-1" />
          {t("refresh")}
        </Button>
      )}
      <span className="self-end pb-0.5 text-sm text-muted-foreground">
        {t("refreshB")}
        <span className="font-medium">{REFRESH_SECONDS - seconds}s</span>
        {t("refreshA")}
      </span>
    </>
  );
}

export default MailRefresh;
