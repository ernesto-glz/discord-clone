import { RequestTypes } from '@discord/types';
import { Socket } from 'socket.io';

export class SessionManager extends Map<string, string> {
  public get(clientId: string): string {
    const userId = super.get(clientId);
    if (!userId) return 'User not logged in';
    return userId;
  }

  public userId(client: Socket) {
    return this.get(client.id);
  }

  public getInstancesFromUserId(userId: string) {
    return Array.from(this.entries())
      .filter(([, value]) => value === userId)
      .map(([key]) => key);
  }

  public isOnline(userId: string) {
    return this.getInstancesFromUserId(userId)?.length ? true : false;
  }

  public getInstancesFromRequest(request: RequestTypes.Populated) {
    const { from, to } = request;
    const fromInstances = this.getInstancesFromUserId(from.id);
    const toInstances = this.getInstancesFromUserId(to.id);
    return [fromInstances, toInstances];
  }
}
