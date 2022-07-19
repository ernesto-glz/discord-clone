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

  public getClientIdFromUserId(userId: string) {
    return Array.from(this.entries()).find(([, value]) => value === userId)?.[0];
  }

  public isOnline(userId: string) {
    return !!this.getClientIdFromUserId(userId);
  }
}
