import { ImapFlow, SearchObject } from "imapflow";
import { Envelope } from "@/lib/types";

const client = new ImapFlow({
  host: process.env.IMAP_HOST ?? "outlook.office365.com",
  port: parseInt(process.env.IMAP_PORT ?? "993"),
  secure: JSON.parse((process.env.IMAP_SECURE ?? "true").toLowerCase()),
  auth: {
    user: process.env.IMAP_USER ?? "",
    pass: process.env.IMAP_PASS ?? "",
  },
  logger: false,
});

async function connect() {
  console.log("connect...");
  await client.connect();
  await client.mailboxOpen("TEMP", { readOnly: true });
}

export async function fetchLast(search: SearchObject) {
  if (!client.authenticated) {
    await connect();
  }
  let mailList: Envelope[] = [];
  try {
    for await (let msg of client.fetch(search, { envelope: true })) {
      mailList.push({
        date: msg.envelope.date,
        subject: msg.envelope.subject,
        from: msg.envelope.from[0],
      });
    }
  } catch (e: any) {
    console.log(e.message);
    if (e.message !== "Connection not available") {
      throw e;
    }

    console.log("reconnect...");
    await connect();
    mailList = await fetchLast(search);
  }

  return mailList;
}
