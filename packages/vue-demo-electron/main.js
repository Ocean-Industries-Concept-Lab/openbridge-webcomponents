const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
  });

  // In development, load from the vue-demo dist folder
  // In production, load from the packaged app folder
  const isDev = process.env.NODE_ENV === "development";
  const indexPath = isDev
    ? path.join(__dirname, "../vue-demo/dist/index.html")
    : path.join(process.resourcesPath, "../app/index.html");

  win.loadFile(indexPath);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
