import { create } from "zustand";
import { persist } from "zustand/middleware";
import { randomMail } from "@/lib/utils";

interface Config {
  mail: string;
  domain: string;
  history: string[];

  update(mail: string, domain: string): void;
  clearHistory(index?: number): void;
}

export const useConfig = create<Config>()(
  persist(
    (set, get) => ({
      mail: randomMail(),
      domain: "",
      history: [],
      update(mail: string, domain: string) {
        const history = get().history;
        const old = get().mail + get().domain;
        if (get().domain) {
          const index = history.indexOf(old);
          if (index >= 0) {
            history.splice(index, 1);
          }
          history.unshift(old);
        }
        set({ mail, domain, history });
      },
      clearHistory(index?: number) {
        if (index === undefined) {
          set({ history: [] });
          return;
        }
        const history = get().history;
        if (index >= history.length) {
          return;
        }
        history.splice(index, 1);
        set({ history });
      },
    }),
    {
      name: "config",
    },
  ),
);
