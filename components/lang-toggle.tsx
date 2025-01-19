"use client";
import * as React from "react";
import { useEffect, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { Locale } from "@/i18n/config";
import { isSetLocale, setUserLocale } from "@/app/locale";

export function LangToggle() {
  const [_, startTransition] = useTransition();

  function onChange(value: string) {
    startTransition(() => setUserLocale(value as Locale));
  }

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined" && !(await isSetLocale())) {
        onChange(navigator.language.split("-")[0]);
      }
    })();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages size={22} strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onChange("zh")}>
          简体中文
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("en")}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
