const fs = require("fs");
const path = require("path");

const { ApolloServer } = require("apollo-server");

// 1

let links = [
	{
		id: "link-0",
		url: "www.howtographql.com",
		description: "Fullstack tutorial for GraphQL",
	},
];

// 2
const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		feed: () => links,
	},

	Link: {
		id: (parent) => parent.id,
		description: (parent) => parent.description,
		url: (parent) => parent.url,
	},
	Mutation: {
		post: (parent, args) => {
			let idCount = links.length;

			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url,
			};
			links.push(link);
			return link;
		},
		updateLink: (parent, args) => {
			let link = links.find((link) => link.id === args.id);
			link.url = args.url;
			link.description = args.description;
			return link;
		},
		deleteLink: (parent, args) => {
			let link = links.find((link) => link.id === args.id);
			links = links.filter((link) => link.id !== args.id);
			return link;
		},
	},
};

// 3
const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
	resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
