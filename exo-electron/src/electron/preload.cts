//in preload we expose the Electron API to the Renderer Process using contextbridge,
// safely interact with the main process without directly accessing node features

// import { ipcRenderer } from "electron";

// const electron = require("electron");

// electron.contextBridge.exposeInMainWorld("electron", {
//   //it exposes the isClicked method to the frontend
//   isClicked: () => ipcRenderer.invoke("isClicked"),
//   saveGameState: (cookies: number, clickValue: number, autoClickers: number) =>
//     ipcRenderer.invoke("save-game-state", cookies, clickValue, autoClickers),
// });
