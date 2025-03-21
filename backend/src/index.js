const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { schema } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => ({ req, prisma }),
});

async function startServer() {
  await server.start();
  await server.applyMiddleware({ app }); // Apply middleware, no destructuring

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`); // Hardcode /graphql
  });
}

startServer();