import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Load typeDefs
let typeDefs: string;
try {
  typeDefs = readFileSync(path.join("./src/electron/schema.graphql"), "utf-8");
  console.log("Loaded typeDefs:", typeDefs); // Debugging
} catch (error) {
  console.error("Error loading schema.graphql:", error);
  process.exit(1); // Exit the process if the schema cannot be loaded
}

// Define types for resolver parameters
type ResolverParent = unknown;
type ResolverArgs = {
  id?: number;
  username?: string;
  password?: string;
  clickValue?: number;
  totalCookies?: number;
  userId?: number;
  shopId?: number;
  countShop?: number;
  name?: string;
  price?: number;
  addedValue?: number;
  inflationRate?: number;
};
type ResolverContext = { prisma: PrismaClient };
type ResolverInfo = unknown;

// Define resolvers with explicit types
const resolvers = {
  Query: {
    user: async (
      parent: ResolverParent,
      args: { id: number },
      context: ResolverContext,
      info: ResolverInfo
    ) => {
      return await context.prisma.user.findUnique({ where: { id: args.id } });
    },
    users: async (
      parent: ResolverParent,
      args: ResolverArgs,
      context: ResolverContext,
      info: ResolverInfo
    ) => {
      return await context.prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: async (
      parent: ResolverParent,
      args: {
        username: string;
        password: string;
        clickValue?: number;
        totalCookies?: number;
      },
      context: ResolverContext,
      info: ResolverInfo
    ) => {
      return await context.prisma.user.create({
        data: {
          username: args.username,
          password: args.password,
          clickValue: args.clickValue || 1,
          totalCookies: args.totalCookies || 0,
        },
      });
    },
  },
};

// Start the Apollo Server
export async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({ prisma }),
  });

  console.log(`🚀 Server ready at ${url}`);
}
