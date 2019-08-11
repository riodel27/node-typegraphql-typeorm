
import { MaxLength } from "class-validator";
import { GraphQLJSONObject } from 'graphql-type-json';
import { ObjectId } from 'mongodb'
import { Field, InputType } from 'type-graphql'

import User from '../schemas/User'

@InputType({ description: "New user input" })
export class AddUserInput implements Partial<User>{
	@Field()
	@MaxLength(10)
	readonly username: string /** readonly not working */

	@Field()
	email: string

	@Field(type => GraphQLJSONObject, { nullable: true })
	random?: object

	@Field({ nullable: true })
	createdAt?: Date

	@Field({ nullable: true })
	updatedAt?: Date
}

@InputType({ description: "Update user input" })
export class UpdateUserInput implements Partial<User>{
	@Field()
	id: ObjectId

	@Field(type => GraphQLJSONObject)
	patch: object

	@Field({ nullable: true, })
	updatedAt?: Date
}