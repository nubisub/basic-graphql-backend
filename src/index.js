const { PrismaClient } = require("@prisma/client");

const Query = require("../resolvers/Query");
const Mutation = require("../resolvers/Mutation");
const User = require("../resolvers/User");
const Link = require("../resolvers/Link");

const fs = require("fs");
const path = require("path");

const { ApolloServer } = require("apollo-server");
const { getUserId } = require("./utils");

const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const Subscription = require("../resolvers/Subscription");

// 1

// 2
const resolvers = {
	Query,
	Mutation,
	User,
	Link,
	Subscription,
};

const prisma = new PrismaClient();

// 3
const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
	resolvers,
	context: ({ req }) => {
		return {
			...req,
			prisma,
			pubsub,
			userId: req && req.headers.authorization ? getUserId(req) : null,
		};
	},
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
