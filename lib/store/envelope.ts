import { createWithEqualityFn as create } from "zustand/traditional";
import { Envelope } from "@/lib/types";

interface EnvelopeStore {
  list: Envelope[];
  admin: boolean;
  setEnvelope(list: Envelope[], admin: boolean): void;
}

export const useEnvelope = create<EnvelopeStore>()((set) => ({
  list: [],
  admin: false,
  setEnvelope(list: Envelope[], admin: boolean) {
    set({ list, admin });
  },
}));
