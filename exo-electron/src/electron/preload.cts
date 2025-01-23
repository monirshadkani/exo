const electron = require("electron");

// electron.contextBridge.exposeInMainWorld("electron", {
//   subscribeStatistics: (callback: (statistics: any) => void) => {
//     electron.ipcRenderer.on("statistics", (_: any, stats: any) => {
//       callback(stats);
//     });
//   },
//   getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
// });

electron.contextBridge.exposeInMainWorld("electron", {
  // You can add methods here later as needed
});
