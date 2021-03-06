import "reflect-metadata";
import cors from "cors";
import connectRedis from "connect-redis";
import session from 'express-session'
import Express from 'express'
import { buildSchema } from "type-graphql";
import { createConnections } from "typeorm";
import { ObjectId } from 'mongodb'
import { ApolloServer } from "apollo-server-express";


import User from './schemas/User'
import Company from './schemas/Company'
import UserResolver from './resolvers/UserResolver'
import CompanyResolver from './resolvers/CompanyResolver'
import { ObjectIdScalar } from './my-scalars/ObjectId'
import { LoginResolver } from './resolvers/LoginResolver'
import { redis } from "./redis";


async function bootstrap() {

	await createConnections([{
		type: "mongodb",
		host: "localhost",
		port: 27017,
		database: "playground",
		entities: [User]
	}, {
		name: "postgresql",
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "postgres",
		password: "root",
		database: "guru99",
		entities: [Company]
	}]);

	const schema = await buildSchema({
		resolvers: [UserResolver, LoginResolver, CompanyResolver],
		emitSchemaFile: true,
		scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }]
	});

	const server = new ApolloServer({
		schema,
		context: ({ req }: any) => ({ req })
	});

	const app = Express()

	const RedisStore = connectRedis(session);

	app.use(
		cors({
			credentials: true,
			origin: "http://localhost:3000"
		})
	);

	app.use(
		session({
			store: new RedisStore({
				client: redis as any
			}),
			name: "qid",
			secret: "aslkdfjoiq12312",
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
			}
		})
	);

	server.applyMiddleware({ app })

	app.listen({ port: 4000 }, () =>
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
	)
}

bootstrap();