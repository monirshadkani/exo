import { ipcRenderer } from "electron";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("versions", {
  //it exposes the isClicked method to the frontend
  isClicked: () => ipcRenderer.invoke("isClicked"),
});
