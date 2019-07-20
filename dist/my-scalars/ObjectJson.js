"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_type_json_1 = require("graphql-type-json");
const graphql_1 = require("graphql");
exports.ObjectScalar = new graphql_1.GraphQLObjectType({
    name: 'ObjectJson',
    fields: {
        name: { type: graphql_type_json_1.GraphQLJSONObject }
    },
});
//# sourceMappingURL=ObjectJson.js.map