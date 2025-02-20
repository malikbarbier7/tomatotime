"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
function createWindow() {
  const primaryDisplay = electron.screen.getPrimaryDisplay();
  const { width } = primaryDisplay.workAreaSize;
  const iconPath = process.platform === "darwin" ? path.join(__dirname, "../renderer/src/assets/images/logotomatotime.icns") : process.platform === "win32" ? path.join(__dirname, "../renderer/src/assets/images/logotomatotime.ico") : path.join(__dirname, "../renderer/src/assets/images/logotomatotime.png");
  const mainWindow = new electron.BrowserWindow({
    width: 300,
    height: 300,
    x: width - 300,
    // Position the window at the right edge
    y: 0,
    // Position the window at the top
    show: false,
    resizable: false,
    autoHideMenuBar: true,
    icon: iconPath,
    // Use the determined icon path
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
