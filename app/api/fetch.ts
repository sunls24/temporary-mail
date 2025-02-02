import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { COUNT_KEY, DELIMITER } from "@/lib/constant";
import NodeCache from "node-cache";

const cache = new NodeCache();

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

const bucket = process.env.R2_BUCKET ?? "main";
const defPrefix = "email" + DELIMITER;

export async function fetchLast(to: string) {
  let prefix = defPrefix;
  if (to !== process.env.ADMIN_ADDRESS) {
    prefix += to + DELIMITER;
  }
  const objs = await listAll(prefix);
  const keys = objs?.map((v) => v.Key!) ?? [];
  keys.sort((a: string, b: string) => getDate(b).localeCompare(getDate(a)));
  return { keys, admin: prefix === defPrefix };
}

const HOUR24 = 86400000;

export async function fetchCount() {
  const ret = cache.get(COUNT_KEY);
  if (ret) {
    return ret;
  }
  const now = new Date().getTime();
  const objs = await listAll(defPrefix);
  const data = { day10: 0, hour24: 0 };
  if (!objs) {
    return data;
  }
  data.day10 = objs.length;
  objs.forEach((obj) => {
    if (now - new Date(getDate(obj.Key!)).getTime() <= HOUR24) {
      data.hour24++;
    }
  });
  cache.set(COUNT_KEY, data, 7200);
  return data;
}

async function listAll(prefix: string, token?: string) {
  const objs = await s3.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      ContinuationToken: token,
    }),
  );
  if (objs.IsTruncated) {
    const next = await listAll(prefix, objs.NextContinuationToken);
    if (next) {
      objs.Contents?.push(...next);
    }
  }
  return objs.Contents;
}

export async function fetchOne(key: string) {
  const obj = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  return obj.Body?.transformToString() ?? "";
}

function getDate(key: string) {
  return atob(key.split(DELIMITER)[2]).split(DELIMITER)[3];
}
