"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit, Shuffle } from "lucide-react";
import { Input } from "@/components/ui/input";
import SelectWrap from "@/components/select-wrap";
import { DOMAIN_LIST } from "@/lib/constant";
import Mounted from "@/components/mounted";
import { useConfig } from "@/lib/store/config";
import { Skeleton } from "@/components/ui/skeleton";
import { randomMail } from "@/lib/utils";
import { emitter, mittKey } from "@/lib/mitt";

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
      setTimeout(() => emitter.emit(mittKey.REFRESH));
    }
  }

  function onRandom() {
    const random = randomMail();
    setMail(random);
    config.update(random, domain);
    setTimeout(() => emitter.emit(mittKey.REFRESH));
  }

  function onMailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMail(e.currentTarget.value.replace(/[^a-zA-Z0-9-_.]/g, ""));
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
    <div className="flex flex-wrap items-center gap-1">
      <Mounted fallback={<Skeleton className="h-8 w-28" />}>
        <Input
          onKeyDown={onKeyDown}
          disabled={!edited}
          value={mail}
          className="w-28 text-end"
          onChange={onMailChange}
        />
      </Mounted>
      <Mounted fallback={<Skeleton className="h-8 w-28" />}>
        <SelectWrap
          value={domain}
          setValue={(domain) => setDomain(domain)}
          list={DOMAIN_LIST}
          disabled={!edited}
        />
      </Mounted>

      <div className="ml-1">
        {!edited && (
          <Button variant="ghost" size="icon" onClick={() => setEdited(true)}>
            <Edit size={20} strokeWidth={1.8} />
          </Button>
        )}
        {edited && (
          <Button variant="ghost" size="icon" onClick={onSave}>
            <CheckCircle size={20} strokeWidth={1.8} />
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={onRandom}>
          <Shuffle size={20} strokeWidth={1.8} />
        </Button>
      </div>
    </div>
  );
}

export default Actions;
