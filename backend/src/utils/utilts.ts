export function transformDocument(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

export function transformUser(doc, user) {
  const isOnline = app.sessions.isOnline(user._id);
  user.status = isOnline ? 'ONLINE' : 'OFFLINE';
  user.id = user._id;
  delete user._id;
  delete user.__v;
  return user;
}

export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}