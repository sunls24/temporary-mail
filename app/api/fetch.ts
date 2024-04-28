import { ImapFlow, SearchObject } from "imapflow";
import { Envelope } from "@/lib/types";
import { getDomainList } from "@/lib/utils";

let client: ImapFlow;
let connecting: Promise<void> | undefined;

async function newClient() {
  if (!connecting) {
    connecting = new Promise<void>(async (resolve, reject) => {
      console.log("newClient...");
      if (client) {
        client.close();
      }
      const newClient = new ImapFlow({
        host: process.env.IMAP_HOST ?? "outlook.office365.com",
        port: parseInt(process.env.IMAP_PORT ?? "993"),
        secure: JSON.parse((process.env.IMAP_SECURE ?? "true").toLowerCase()),
        auth: {
          user: process.env.IMAP_USER ?? "",
          pass: process.env.IMAP_PASS ?? "",
        },
        logger: false,
      });

      try {
        await newClient.connect();
        await newClient.mailboxOpen(process.env.IMAP_PATH ?? "Junk", {
          readOnly: true,
        });
      } catch (err: any) {
        reject({ message: `${err}, ${err.responseText}` });
      }
      client = newClient;
      resolve();
    }).finally(() => {
      connecting = undefined;
    });
  }
  await connecting;
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
        uid: msg.uid,
        date: msg.envelope.date,
        subject: msg.envelope.subject,
        from: msg.envelope.from[0],
      });
    }
    return mailList;
  });
}

const DAY10 = 864000000;
const HOUR24 = 86400000;

export async function fetchLast10Day() {
  const now = new Date().getTime();
  return await run(async () => {
    const data = { day10: 0, hour24: 0 };
    for (let domain of getDomainList()) {
      for await (let msg of client.fetch(
        { since: new Date(now - DAY10), to: `*${domain}` },
        { internalDate: true },
      )) {
        data.day10++;
        if (now - msg.internalDate.getTime() <= HOUR24) {
          data.hour24++;
        }
      }
    }
    return data;
  });
}

export async function fetchOne(uid: string) {
  console.log("fetchOne", uid);
  return await run(
    async () => await client.fetchOne(uid, { source: true }, { uid: true }),
  );
}
