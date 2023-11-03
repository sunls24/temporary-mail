import { create } from "zustand";
import { Envelope } from "@/lib/types";

interface EnvelopeStore {
  list: Envelope[];
  setEnvelope(list: Envelope[]): void;
}

export const useEnvelope = create<EnvelopeStore>()((set) => ({
  list: [],
  setEnvelope(list: Envelope[]) {
    set({ list });
  },
}));
