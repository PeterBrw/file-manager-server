const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");

const port = 9000;

const app = express();

const typeDefs = gql(fs.readFileSync("./schema.graphql", { encoding: "utf8" }));
const resolvers = require("./resolvers");
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen(port, () => console.info(`Server started on port ${port}`));
