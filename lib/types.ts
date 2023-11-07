import { MessageAddressObject } from "imapflow";

export interface Envelope {
  uid: number;
  date: Date;
  subject: string;
  from: MessageAddressObject;
}
