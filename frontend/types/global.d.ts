import { RestClient } from "src/modules/RestClient";
import { WSClient } from "src/modules/WSClient";

declare global {
  var events: EventEmitter;
  var _r: ResolvePathFunction;
  var restClient: RestClient;
  var wsClient: WSClient;
}
export {};
