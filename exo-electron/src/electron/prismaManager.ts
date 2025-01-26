// export class PrismaManager {
//   typeDefs: string;
//   //resolvers: IResolvers;
//   prisma: PrismaClient;

//   constructor() {
//     this.prisma = new PrismaClient();
//     this.typeDefs = readFileSync(
//       path.join(__dirname, "/electron/schema.graphql"),
//       "utf-8"
//     );
//   }

//   public async startSever(): Promise<void> {
//     const typeDefs = this.typeDefs;
//     const resolvers = {
//       Query: {
//         users: async () => {
//           return await this.prisma.user.findMany();
//         },
//         shops: async () => {
//           return await this.prisma.shop.findMany();
//         },
//         shopsonuser: async () => {
//           return await this.prisma.shopsOnUsers.findMany();
//         },
//       },
//       Mutation: {
//         // Example resolver to create data using Prisma
//         // createGameState: async (_, { state }) => {
//         //   return await prisma.gameState.create({
//         //     data: { state },
//         //   });
//         // },
//       },
//     };
//     const server = new ApolloServer({
//       typeDefs,
//       resolvers,
//     });
//     const { url } = await startStandaloneServer(server, {
//       listen: { port: 4000 },
//       context: async () => ({
//         prisma: new PrismaClient(),
//       }),
//     });
//     console.log(`🚀 Server ready at ${url}`);
//   }
// }
