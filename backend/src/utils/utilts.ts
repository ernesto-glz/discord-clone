export function transformDocument(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
}

export function transformUser(doc, user) {
  if (process.env.NODE_ENV === 'test') return user;
  const isOnline = app.sessions.isOnline(user._id);
  user.status = isOnline ? 'ONLINE' : 'OFFLINE';
  user.id = user._id;
  delete user._id;
  delete user.__v;
  return user;
}

export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function moveToStart(elements: string[], elementId: string) {
  const elms = [...elements];
  const index = elms.indexOf(elementId);
  elms.splice(index, 1);
  elms.unshift(...[elementId]);
  return elms;
}
