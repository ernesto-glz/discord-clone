// Resolve assets root path
const userAgent = navigator.userAgent.toLowerCase();
const isElectron = userAgent.includes('electron');

export function _r(route: string) {
  return route.startsWith('/') && isElectron ? route.substring(1) : route;
}

global['_r'] = _r;
global['isElectron'] = isElectron;

export type ResolvePathFunction = typeof _r;
