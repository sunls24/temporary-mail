import { createStore } from "zustand/vanilla";

export interface ConfigServer {
  domain: string[];
}

const def: ConfigServer = { domain: [] };

export const createConfigServerStore = () => {
  const store = createStore<ConfigServer>(() => def);
  fetchConfig().then(store.setState);
  return store;
};

const fetchConfig = async () => {
  console.log("-> fetch server config");
  const res = await fetch("/api/config");
  return await res.json();
};

export const configServerStore = createConfigServerStore();
