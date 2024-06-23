import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const bucket = process.env.R2_BUCKET!;

export async function fetchLast(to: string) {
  const objs = await s3.send(
    new ListObjectsV2Command({ Bucket: bucket, Prefix: "email;" + to + ";" }),
  );
  return objs.Contents?.map((v) => v.Key) ?? [];
}

const HOUR24 = 86400000;

export async function fetchLast10Day() {
  const now = new Date().getTime();
  const objs = await s3.send(new ListObjectsV2Command({ Bucket: bucket }));
  const data = { day10: 0, hour24: 0 };
  if (!objs.Contents) {
    return data;
  }
  objs.Contents.forEach((obj) => {
    data.day10++;
    const date = atob(obj.Key!.split(";")[2]).split(";")[3];
    if (now - new Date(date).getTime() <= HOUR24) {
      data.hour24++;
    }
  });
  return data;
}

export async function fetchOne(key: string) {
  const obj = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  return obj.Body?.transformToString() ?? "";
}
