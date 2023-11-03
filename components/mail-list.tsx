"use client";
import React from "react";
import { useEnvelope } from "@/lib/store/envelope";
import { fmtLocaleTime } from "@/lib/utils";

function MailList() {
  const envelope = useEnvelope((state) => state.list);
  return (
    <div className="flex flex-1 flex-col-reverse overflow-auto">
      <span className="flex-1" />
      {envelope.map((value, index) => (
        <div
          key={index}
          className="border-b px-4 py-2 first:border-0 hover:bg-secondary"
        >
          <div className="mb-2 flex w-full justify-between text-muted-foreground">
            <span>{value.from.name}</span>
            <span className="text-sm">
              {fmtLocaleTime(new Date(value.date))}
            </span>
          </div>
          <span className="font-medium">{value.subject}</span>
        </div>
      ))}
    </div>
  );
}

export default MailList;
