import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";
import { ApolloContextValue } from "@apollo/client";
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

app.whenReady().then(() => {
  ipcMain.handle("isClicked", () => {
    return "clicked";
  });
});

// handle saving the game state
// ipcMain.handle(
//   //listens for requests from renderer (react)
//   "save-game-state", //channel name
//   (_, cookies: number, clickValue: number, autoClickers: number) => {
//     saveGameState(cookies, clickValue, autoClickers); //calling the function
//   }
// );

//setting up graphql
const prisma = new PrismaClient();

// Read the GraphQL schema
const typeDefs = readFileSync("./src/electron/schema.graphql", "utf-8");

// Define resolvers
const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    shops: async () => {
      return await prisma.shop.findMany();
    },
    shopsOnUsers: async () => {
      return await prisma.shopsOnUsers.findMany();
    },
  },
  Mutation: {
    // Example resolver to create data using Prisma
    // createGameState: async (_, { state }) => {
    //   return await prisma.gameState.create({
    //     data: { state },
    //   });
    // },
  },
};

// Create and start the Apollo Server
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({
      prisma, // Pass the Prisma client to the context
    }),
  });

  console.log(`🚀 Server ready at ${url}`);
}

// Start the server
startServer().catch((error) => {
  console.error("Error starting server:", error);
});
