import { Server } from "socket.io";
import { App } from "src/modules/app";

declare global {
  var app: App;
}
export {};
