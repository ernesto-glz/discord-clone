// Resolve assets root path
function _r(route: string) {
  const userAgent = navigator.userAgent.toLowerCase();
  const isElectron = userAgent.includes('electron');
  return route.startsWith('/') && isElectron ? route.substring(1) : route;
}

global['_r'] = _r;
export type ResolvePathFunction = typeof _r;
