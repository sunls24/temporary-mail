"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, History, PenLine, Shuffle } from "lucide-react";
import { Input } from "@/components/ui/input";
import SelectWrap from "@/components/select-wrap";
import Mounted from "@/components/mounted";
import { useConfig } from "@/lib/store/config";
import { Skeleton } from "@/components/ui/skeleton";
import { randomMail } from "@/lib/utils";
import { emitter, mittKey } from "@/lib/mitt";
import { toast } from "sonner";
import MailHistory from "@/components/mail-history";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { configServerStore } from "@/lib/store/config-server";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

function Actions() {
  const t = useTranslations();
  const configServer = useStoreWithEqualityFn(configServerStore);
  const config = useConfig();
  const [mail, setMail] = useState(config.mail);
  const [domain, setDomain] = useState(config.domain);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const address = searchParams.get("to");
    console.log("-> to:", address);
    if (!address) {
      return;
    }
    const [toMail, toDomain] = address.split("@");
    config.update(toMail, "@" + toDomain, (cfg) => {
      const currentAddress = cfg.mail + cfg.domain;
      if (currentAddress === address) {
        return false;
      }
      const index = cfg.history.indexOf(address);
      if (index >= 0) {
        cfg.clearHistory(index);
      }
      return true;
    });
  }, []);

  useEffect(() => {
    mail !== config.mail && setMail(config.mail);
    domain !== config.domain && setDomain(config.domain);
    if (config.domain) {
      router.replace("/?to=" + config.mail + config.domain);
    }
  }, [config]);

  useEffect(() => {
    if (config.domain || !configServer.domain[0]) {
      return;
    }
    console.log("-> set default domain:", configServer.domain[0]);
    config.update(config.mail, configServer.domain[0], (cfg) => false);
  }, [configServer.domain]);

  function onSave() {
    if (!mail || !domain) {
      return;
    }
    setEdited(false);
    if (config.mail != mail || config.domain != domain) {
      config.update(mail, domain, (cfg) => {
        const index = cfg.history.indexOf(mail + domain);
        if (index >= 0) {
          cfg.clearHistory(index);
        }
        return true;
      });
      toast.success(t("editNew") + " " + mail + domain);
      setTimeout(() => emitter.emit(mittKey.REFRESH));
    }
  }

  function onRandom() {
    const random = randomMail();
    config.update(random, domain);
    setTimeout(() => emitter.emit(mittKey.REFRESH));
    toast.success(t("randomNew") + " " + random + domain);
  }

  function onChange(mail: string, domain: string) {
    config.update(mail, domain);
    setTimeout(() => emitter.emit(mittKey.REFRESH));
    toast.success(t("changeNew") + " " + mail + domain);
  }

  function onMailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value.replace(/[^a-zA-Z0-9-_.]/g, "");
    if (value.length > 64) {
      return;
    }
    setMail(value);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) {
      return;
    }
    e.preventDefault();
    onSave();
  }

  const [edited, setEdited] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex h-9 items-center gap-1">
        <Mounted fallback={<Skeleton className="h-8 w-28" />}>
          <Input
            onKeyDown={onKeyDown}
            disabled={!edited}
            value={mail}
            className="w-28 text-end"
            onChange={onMailChange}
          />
        </Mounted>
        <Mounted fallback={<Skeleton className="h-8 w-[118px]" />}>
          <SelectWrap
            value={domain}
            setValue={(domain) => setDomain(domain)}
            list={configServer.domain}
            disabled={!edited}
            className="w-[118px] px-2"
          />
        </Mounted>
      </div>

      {!edited && (
        <Button variant="outline" onClick={() => setEdited(true)}>
          <PenLine size={16} className="mr-1" />
          {t("edit")}
        </Button>
      )}
      {edited && (
        <Button variant="outline" onClick={onSave}>
          <CheckCircle size={16} className="mr-1" />
          {t("save")}
        </Button>
      )}
      <Button variant="outline" onClick={onRandom}>
        <Shuffle size={16} className="mr-1" />
        {t("random")}
      </Button>
      <MailHistory onChange={onChange}>
        <Button variant="outline">
          <History size={16} className="mr-1" />
          {t("history")}
        </Button>
      </MailHistory>
    </div>
  );
}

export default Actions;
