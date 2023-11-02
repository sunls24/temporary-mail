import React from "react";
import MailTitle from "@/components/mail-title";
import MailRefresh from "@/components/mail-refresh";

function Mail() {
  return (
    <div className="flex-1 rounded-md border shadow">
      <div className="border-b p-3">
        <div className="flex flex-wrap items-center gap-2">
          <MailTitle />
          <span className="flex-1" />
          <MailRefresh />
        </div>
      </div>
    </div>
  );
}

export default Mail;
