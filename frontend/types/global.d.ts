import { RestClient } from 'src/modules/RestClient';
import { WSClient } from 'src/modules/WSClient';
import { globalEnv as env } from 'src/services/global-service';

declare global {
  var isElectron: boolean;
  var events: EventEmitter;
  var _r: ResolvePathFunction;
  var restClient: RestClient;
  var wsClient: WSClient;
  var globalEnv: typeof env;
  var _env_: typeof env;
}
export {};
