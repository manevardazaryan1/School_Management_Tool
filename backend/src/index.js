// src/index.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const resolvers = require('./graphql/resolvers');

const prisma = new PrismaClient();

async function startApolloServer() {
  const typeDefs = fs.readFileSync(
    path.join(__dirname, 'graphql/schema/schema.graphql'),
    'utf-8'
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { prisma },
  });

  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startApolloServer();