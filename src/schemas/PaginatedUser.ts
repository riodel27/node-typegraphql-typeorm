import { ObjectType, Field } from "type-graphql";

import User from './User'


@ObjectType()
export default class PaginatedUser {
	@Field()
	cursor : string
	@Field()
	hasMore: boolean
	@Field(type => [User	])
	users: [User]
}