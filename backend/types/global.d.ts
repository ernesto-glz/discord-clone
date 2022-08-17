import { Server } from "socket.io";
import { App } from "src/modules/app";
import { WSGateway } from "src/ws/websocket";

declare global {
  var app: App;
  var ws: WSGateway;
}
export {};
