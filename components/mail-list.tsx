"use client";
import React from "react";
import { useEnvelope } from "@/lib/store/envelope";
import { fmtLocaleTime } from "@/lib/utils";
import MailDetail from "@/components/mail-detail";

function MailList() {
  const envelope = useEnvelope((state) => state.list);

  return (
    <div className="flex flex-1 flex-col-reverse overflow-auto">
      <span className="flex-1" />
      {envelope.map((value) => (
        <MailDetail key={value.uid} envelope={value}>
          <div className="border-b px-4 py-2 first:border-0 hover:bg-secondary">
            <span className="font-medium">{value.subject}</span>
            <div className="mb-2 flex w-full justify-between text-muted-foreground">
              <span>{value.from.name}</span>
              <span className="text-sm">
                {fmtLocaleTime(new Date(value.date))}
              </span>
            </div>
          </div>
        </MailDetail>
      ))}
    </div>
  );
}

export default MailList;
