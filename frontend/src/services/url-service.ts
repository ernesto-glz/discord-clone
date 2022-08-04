export function buildAssetsRoot() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isElectron = userAgent.includes("electron");

  global["ASSETS_PATH"] = isElectron ? "assets" : "/assets";
}
