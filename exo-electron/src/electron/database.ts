import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// const resolvers = {
//   query: {
//     users: async () => {
//       return await prisma.user.findmany();
//     },
//     shops: async () => {
//       return await prisma.shop.findmany();
//     },
//     shopsonuser: async () => {
//       return await prisma.shopsonusers.findmany();
//     },
//   },
//   mutation: {
//     // example resolver to create data using prisma
//     // creategamestate: async (_, { state }) => {
//     //   return await prisma.gamestate.create({
//     //     data: { state },
//     //   });
//     // },
//   },
// };
