"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ObjectId_1 = require("./my-scalars/ObjectId");
const User_1 = __importDefault(require("./schemas/User"));
const UserResolver_1 = __importDefault(require("./resolvers/UserResolver"));
async function bootstrap() {
    const schema = await type_graphql_1.buildSchema({
        resolvers: [UserResolver_1.default],
        emitSchemaFile: true,
        scalarsMap: [{ type: mongodb_1.ObjectId, scalar: ObjectId_1.ObjectIdScalar }],
        dateScalarMode: "isoDate"
    });
    const server = new apollo_server_1.ApolloServer({ schema });
    // const connections: Connection[] = await createConnections();
    const connection = await typeorm_1.createConnection({
        type: "mongodb",
        host: "localhost",
        port: 27017,
        database: "playground",
        entities: [User_1.default]
    });
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
}
bootstrap();
//# sourceMappingURL=index.js.map