import mitt from "mitt";

export enum mittKey {
  REFRESH = "REFRESH",
}

export const emitter = mitt();
