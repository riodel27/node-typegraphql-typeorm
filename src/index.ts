import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import {ObjectId} from 'mongodb'
import { buildSchema } from "type-graphql";
import {createConnection, createConnections, Connection} from "typeorm";

import {ObjectIdScalar} from './my-scalars/ObjectId'
import User from './schemas/User'
import UserResolver from './resolvers/UserResolver'


async function bootstrap() {
  const schema = await buildSchema({
		resolvers: [UserResolver],
		emitSchemaFile: true,
		scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  });
	const server = new ApolloServer({ schema });
	
	// const connections: Connection[] = await createConnections();

	const connection: Connection = await createConnection({
		name: "default",
    type: "mongodb",
    host: "localhost",
    port: 27017,
		database: "playground",
		entities:[User]
});

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

bootstrap();