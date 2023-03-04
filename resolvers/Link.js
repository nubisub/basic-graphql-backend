context: ({ req }) => {
	return {
		...req,
		prisma,
		userId: req && req.headers.authorization ? getUserId(req) : null,
	};
};
