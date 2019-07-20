"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const Menu_1 = require("./schemas/Menu");
const mongodb_1 = require("mongodb");
const ObjectId_1 = require("./my-scalars/ObjectId");
async function bootstrap() {
    const schema = await type_graphql_1.buildSchema({
        resolvers: [user_1.UserResolver, Menu_1.MenuResolver],
        emitSchemaFile: true,
        scalarsMap: [{ type: mongodb_1.ObjectId, scalar: ObjectId_1.ObjectIdScalar }],
    });
    const server = new apollo_server_1.ApolloServer({ schema });
    const connections = await typeorm_1.createConnections();
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
}
bootstrap();
//# sourceMappingURL=index.js.map