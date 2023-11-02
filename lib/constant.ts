export const domainList = (process.env.NEXT_PUBLIC_DOMAIN_LIST ?? "")
  .split("|")
  .map((v) => "@" + v);
