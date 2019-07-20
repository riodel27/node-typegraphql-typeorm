import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { GraphQLObjectType, Kind } from "graphql";


export const ObjectScalar = new GraphQLObjectType({
  name: 'ObjectJson',

  fields: {
    name: { type: GraphQLJSONObject }
  },
});