import React from "react";
import { Github, ShieldCheck } from "lucide-react";
import { VERSION } from "@/lib/constant";

function Header() {
  return (
    <header className="h-16 shrink-0 border-b shadow-sm">
      <div className="mx-auto flex h-full w-[90%] max-w-4xl items-center">
        <ShieldCheck strokeWidth={1.8} />
        <span className="ml-1 font-medium">临时邮箱</span>
        <span className="flex-1" />
        <a
          href="https://github.com/sunls24/temporary-mail"
          target="_blank"
          className="flex items-center rounded-md p-1 transition-colors hover:bg-secondary"
        >
          <Github size={18} strokeWidth={1.8} />
          <span className="ml-1 text-sm font-medium text-muted-foreground underline underline-offset-4">
            v{VERSION}
          </span>
        </a>
      </div>
    </header>
  );
}

export default Header;
