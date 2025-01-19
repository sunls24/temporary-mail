"use client";
import React from "react";
import { useEnvelope } from "@/lib/store/envelope";
import { fmtLocaleTime } from "@/lib/utils";
import MailDetail from "@/components/mail-detail";
import { DELIMITER } from "@/lib/constant";

function MailList() {
  const [envelope, admin] = useEnvelope((state) => [state.list, state.admin]);

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      {envelope.map((value) => (
        <MailDetail key={value.key} envelope={value}>
          <div className="border-b px-4 py-3 hover:bg-secondary">
            <div className="flex items-center justify-between">
              <span className="font-medium">{value.subject}</span>
              {admin && (
                <span className="text-sm text-muted-foreground">
                  {value.key.split(DELIMITER)[1]}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>{value.fromName}</span>
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
