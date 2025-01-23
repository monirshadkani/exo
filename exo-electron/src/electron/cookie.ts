import { BrowserWindow } from "electron";

const REFRESH_INTERVAL = 500;

export function showCookie(mainWindow: BrowserWindow) {
  setInterval(() => {}, REFRESH_INTERVAL);
  mainWindow.webContents.send("statistics", {});
}
