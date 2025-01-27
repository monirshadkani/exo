// main.ts
import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";
import { startApolloServer } from "./apolloServer.js";

startApolloServer().catch((error) => {
  console.error("Error starting Apollo Server:", error);
});

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      sandbox: true,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123"); // Dev mode
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + "/dist-react/index.html")); // Prod
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
