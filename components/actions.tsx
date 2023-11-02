"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit, Shuffle } from "lucide-react";
import { Input } from "@/components/ui/input";
import SelectWrap from "@/components/select-wrap";
import { domainList } from "@/lib/constant";
import Mounted from "@/components/mounted";
import { useConfig } from "@/lib/store/config";
import { Skeleton } from "@/components/ui/skeleton";
import { randomMail } from "@/lib/utils";

function Actions() {
  const config = useConfig();
  const [mail, setMail] = useState(config.mail);
  const [domain, setDomain] = useState(config.domain);

  function onSave() {
    if (!mail) {
      return;
    }
    config.update(mail, domain);
    setEdited(false);
  }

  function onRandom() {
    const random = randomMail();
    setMail(random);
    config.update(random, domain);
  }

  function onMailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMail(e.currentTarget.value.replace(/[^a-zA-Z0-9-_.]/g, ""));
  }

  const [edited, setEdited] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-1">
      <Mounted fallback={<Skeleton className="h-8 w-28" />}>
        <Input
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
          list={domainList}
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
