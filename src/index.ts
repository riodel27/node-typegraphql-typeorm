import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import {createConnection, createConnections, Connection} from "typeorm";
import {UserResolver} from './user'
import {MenuResolver} from './schemas/Menu'
import {ObjectId} from 'mongodb'
import {ObjectIdScalar} from './my-scalars/ObjectId'

async function bootstrap() {
  const schema = await buildSchema({
		resolvers: [UserResolver,MenuResolver],
		emitSchemaFile: true,
		scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  });
	const server = new ApolloServer({ schema });
	
	const connections: Connection[] = await createConnections();

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

bootstrap();