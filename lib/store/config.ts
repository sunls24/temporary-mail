import { create } from "zustand";
import { persist } from "zustand/middleware";
import { randomMail } from "@/lib/utils";
import { DOMAIN_LIST } from "@/lib/constant";

interface Config {
  mail: string;
  domain: string;

  update(mail: string, domain: string): void;
}

export const useConfig = create<Config>()(
  persist(
    (set) => ({
      mail: randomMail(),
      domain: DOMAIN_LIST[0],
      update(mail: string, domain: string) {
        set({ mail, domain });
      },
    }),
    {
      name: "config",
    },
  ),
);
