const express = require("express");
const { createServer } = require("http");
const { ApolloServer, ApolloError, PubSub } = require("apollo-server-express");
const { MongoClient } = require("mongodb");
const { readFileSync } = require("fs");
const expressPlayground = require("graphql-playground-middleware-express")
    .default;
const jwt = require("jsonwebtoken");
const resolvers = require("./resolvers");
const config = require("../config");

const typeDefs = readFileSync("./gql/typeDefs.graphql", "UTF-8");

async function start() {
    const app = express();
    const MONGO_DB = config.MONGO_CONNECTION_URI;
    const pubsub = new PubSub();
    let db;

    try {
        const client = await MongoClient.connect(
            MONGO_DB,
            { useNewUrlParser: true }
        );
        db = client.db();
    } catch (error) {
        console.log(`
        
          Mongo DB Host not found!
          please add DB_HOST environment variable to .env file
          exiting...
           
        `);
        process.exit(1);
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        subscriptions: {
            path: "/subscription",
            onConnect: connection => {
                console.log("connected");
            },
            onDisconnect: () => {
                console.log("disconeccted");
            }
        },
        context: async ({ req, connection }) => {
            const token = req
                ? req.headers.authorization
                : connection.context.authorization;
            let currentUser = null;
            if (token) {
                currentUser = jwt.decode(token, config.secret).user;
            }
            let err = null;

            try {
                jwt.verify(token, config.secret);
            } catch (err) {
                err = new ApolloError("session expired");
            }

            if (err) {
                console.log("jwt has expired");
                err = new ApolloError("session expired");
            }
            return { db, currentUser, pubsub, err };
        }
    });

    server.applyMiddleware({ app });

    app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

    app.get("/", (req, res) => {
        res.end(`Welcome to the chat-thing api`);
    });

    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.timeout = 5000;

    httpServer.listen({ port: 4000 }, () =>
        console.log(
            `GraphQL Server running at http://localhost:4000${
                server.graphqlPath
            }`
        )
    );
}

start();
