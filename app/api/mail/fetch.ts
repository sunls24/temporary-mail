import { ImapFlow, SearchObject } from "imapflow";
import { Envelope } from "@/lib/types";

let client: ImapFlow;

async function newClient() {
  console.log("newClient...");
  if (client) {
    client.close();
  }
  client = new ImapFlow({
    host: process.env.IMAP_HOST ?? "outlook.office365.com",
    port: parseInt(process.env.IMAP_PORT ?? "993"),
    secure: JSON.parse((process.env.IMAP_SECURE ?? "true").toLowerCase()),
    auth: {
      user: process.env.IMAP_USER ?? "",
      pass: process.env.IMAP_PASS ?? "",
    },
    logger: false,
  });

  await client.connect();
  await client.mailboxOpen(process.env.IMAP_PATH ?? "TEMP", { readOnly: true });
}

async function run(fn: () => Promise<any>) {
  if (!client) {
    await newClient();
  }
  let res: any;
  try {
    res = await fn();
  } catch (e: any) {
    console.log("Error:", e.message);
    if (e.message !== "Connection not available") {
      throw e;
    }
    await newClient();
    res = await fn();
  }
  return res;
}

export async function fetchLast(search: SearchObject) {
  console.log("fetchLast", search.to);
  return await run(async () => {
    const mailList: Envelope[] = [];
    for await (let msg of client.fetch(search, { envelope: true })) {
      mailList.push({
        date: msg.envelope.date,
        subject: msg.envelope.subject,
        from: msg.envelope.from[0],
      });
    }
    return mailList;
  });
}
