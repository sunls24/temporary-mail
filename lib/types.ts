import { MessageAddressObject } from "imapflow";

export interface Envelope {
  date: Date;
  subject: string;
  from: MessageAddressObject;
}
