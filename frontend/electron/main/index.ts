import { app, BrowserWindow, shell, ipcMain } from "electron";
import { join } from "path";

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, "../.."),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? "../.." : "../../../res"),
};

let mainWindow: BrowserWindow | null = null;
let loadingWindow: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;
const indexHtml = join(ROOT_PATH.dist, "index.html");

async function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    title: "Loading Window",
    minWidth: 300,
    minHeight: 350,
    width: 300,
    height: 350,
    frame: false,
  });
  loadingWindow.setResizable(false);
  loadingWindow.removeMenu();

  await loadingWindow.loadFile(join(ROOT_PATH.public, "/loader/index.html"));
}

async function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Main window",
    icon: join(ROOT_PATH.public, "favicon.svg"),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1200,
    height: 690,
    minWidth: 950,
    minHeight: 500,
  });

  mainWindow.removeMenu();
  loadingWindow.close();

  if (app.isPackaged) {
    mainWindow.loadFile(indexHtml);
    mainWindow.webContents.openDevTools({ mode: "undocked" });
  } else {
    mainWindow.loadURL(url);
    mainWindow.webContents.openDevTools({ mode: "undocked" });
  }

  // Test actively push message to the Electron-Renderer
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow?.webContents.send(
      "main-process-message",
      new Date().toLocaleString()
    );
  });

  // Make all links open with the browser, not with the application
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  createLoadingWindow().then(() => {
    setTimeout(() => createMainWindow(), 3000);
  });
});

app.on("window-all-closed", () => {
  mainWindow = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (mainWindow) {
    // Focus on the main window if the user tried to open another
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

ipcMain.handle("open-devtools", () => {
  mainWindow.webContents.openDevTools();
});
