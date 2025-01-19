"use client";
import React, { useEffect, useState } from "react";
import { PieChart, TrendingUp } from "lucide-react";
import Count from "@/components/count";
import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations();
  const [data, setData] = useState({ day10: "x", hour24: "x" });

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/count", { signal: controller.signal }).then(async (res) => {
      if (!res.ok) {
        return;
      }
      setData(await res.json());
    });
    return () => controller.abort("unload");
  }, []);

  return (
    <div className="my-1.5 flex items-center justify-center text-sm text-muted-foreground">
      <PieChart size={16} className="mr-1" />
      {t("day10B")}
      {<Count count={data.day10} />}
      {t("countA")}
      <TrendingUp size={16} className="mx-1" />
      {t("hour24B")}
      {<Count count={data.hour24} />}
      {t("countA")}
    </div>
  );
}

export default Footer;
