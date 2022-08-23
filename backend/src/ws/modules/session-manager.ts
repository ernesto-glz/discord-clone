import { RequestTypes } from '@dclone/types';
import { RemoteSocket, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export class SessionManager extends Map<string, string> {
  public userId(client: Socket | RemoteSocket<DefaultEventsMap, any>) {
    return this.get(client.id);
  }

  /*
   * Returns the active sessions of a user.
   * In case of being disconnected return empty array.
   * websocket.ts handles this empty array and converts it to a string so as not to cause a broadcast.
   */
  public getSessions(userId: string) {
    return Array.from(this.entries())
      .filter(([, value]) => value === userId)
      .map(([key]) => key);
  }

  public isOnline(userId: string) {
    return this.getSessions(userId)?.length ? true : false;
  }

  public getSessionsFromRequest(request: RequestTypes.Populated) {
    const { from, to } = request;
    return [this.getSessions(from.id), this.getSessions(to.id)];
  }
}
