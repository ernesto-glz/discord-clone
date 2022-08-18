import { Server } from "socket.io";
import { App } from "src/modules/app";
import { WSGateway } from "src/ws/websocket";
import winston from "winston";

declare global {
  var app: App;
  var ws: WSGateway;
  var logger: winston.Logger;
}
export {};
