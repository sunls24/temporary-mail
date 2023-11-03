export const domainList = (process.env.NEXT_PUBLIC_DOMAIN_LIST ?? "")
  .split("|")
  .map((v) => "@" + v);

export const refreshSeconds = parseInt(
  process.env.NEXT_PUBLIC_REFRESH_SECONDS ?? "10",
);
