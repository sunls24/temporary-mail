"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, History, PenLine, Shuffle } from "lucide-react";
import { Input } from "@/components/ui/input";
import SelectWrap from "@/components/select-wrap";
import { DOMAIN_LIST } from "@/lib/constant";
import Mounted from "@/components/mounted";
import { useConfig } from "@/lib/store/config";
import { Skeleton } from "@/components/ui/skeleton";
import { randomMail } from "@/lib/utils";
import { emitter, mittKey } from "@/lib/mitt";
import { toast } from "sonner";
import MailHistory from "@/components/mail-history";

function Actions() {
  const config = useConfig();
  const [mail, setMail] = useState(config.mail);
  const [domain, setDomain] = useState(config.domain);

  useEffect(() => {
    mail !== config.mail && setMail(config.mail);
    domain !== config.domain && setDomain(config.domain);
  }, [config]);

  function onSave() {
    if (!mail || !domain) {
      return;
    }
    setEdited(false);
    if (config.mail != mail || config.domain != domain) {
      config.update(mail, domain);
      toast.success("已修改至新地址 " + mail + domain);
      setTimeout(() => emitter.emit(mittKey.REFRESH));
    }
  }

  function onRandom() {
    const random = randomMail();
    config.update(random, domain);
    setTimeout(() => emitter.emit(mittKey.REFRESH));
    toast.success("已随机至新地址 " + random + domain);
  }

  function onChange(mail: string, domain: string) {
    config.update(mail, domain);
    setTimeout(() => emitter.emit(mittKey.REFRESH));
    toast.success("已切换至新地址 " + mail + domain);
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
            list={DOMAIN_LIST}
            disabled={!edited}
            className="w-[118px] px-2"
          />
        </Mounted>
      </div>

      {!edited && (
        <Button variant="outline" onClick={() => setEdited(true)}>
          <PenLine size={16} className="mr-1" />
          编辑
        </Button>
      )}
      {edited && (
        <Button variant="outline" onClick={onSave}>
          <CheckCircle size={16} className="mr-1" />
          保存
        </Button>
      )}
      <Button variant="outline" onClick={onRandom}>
        <Shuffle size={16} className="mr-1" />
        随机
      </Button>
      <MailHistory onChange={onChange}>
        <Button variant="outline">
          <History size={16} className="mr-1" />
          历史
        </Button>
      </MailHistory>
    </div>
  );
}

export default Actions;
