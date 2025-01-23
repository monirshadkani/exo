import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fs from "fs";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";

//the main window
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true, //  context isolation is enabled for security
      sandbox: true, // sandboxing for additional security
    },
  });

  //loadin react
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123"); //dev mode
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + "/dist-react/index.html")); //prod
  }
});
//quitting the app when windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
