import React from "react";
import { Github, ShieldCheck } from "lucide-react";
import { VERSION } from "@/lib/constant";
import { ModeToggle } from "@/components/mode-toggle";
import { useTranslations } from "next-intl";
import { LangToggle } from "@/components/lang-toggle";

function Header() {
  const t = useTranslations();
  return (
    <header className="h-16 shrink-0 border-b shadow-sm">
      <div className="mx-auto flex h-full w-[90%] max-w-4xl items-center">
        <ShieldCheck strokeWidth={1.8} />
        <span className="ml-1 font-medium">{t("title")}</span>
        <span className="flex-1" />
        <LangToggle />
        <ModeToggle />
        <a
          href="https://github.com/sunls24/temporary-mail"
          target="_blank"
          className="ml-1 flex items-center rounded-md p-1 transition-colors hover:bg-secondary"
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
