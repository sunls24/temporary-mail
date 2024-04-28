const DOMAIN_LIST_ENV = process.env.DOMAIN_LIST ?? "@not.set.yet";

export const DOMAIN_LIST_SERVER = DOMAIN_LIST_ENV.split("|");

export const REFRESH_SECONDS =
  process.env.NODE_ENV === "development" ? 1000 : 10;

export const VERSION = "1.0.2";
