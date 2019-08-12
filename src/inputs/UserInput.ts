import { Length, IsEmail } from "class-validator";
import { GraphQLJSONObject } from 'graphql-type-json';
import { ObjectId } from 'mongodb'
import { Field, InputType } from 'type-graphql'

import User from '../schemas/User'

@InputType({ description: "New user input" })
export class AddUserInput implements Partial<User>{
	@Field()
	@Length(1, 255)
	readonly username: string /** readonly not working */

	@Field()
	@IsEmail()
	email: string

	@Field()
	password: string

	@Field()
	confirmPassword: string

	@Field(type => GraphQLJSONObject, { nullable: true })
	random?: object

	@Field({ nullable: true })
	createdAt?: Date

	@Field({ nullable: true })
	updatedAt?: Date
}

@InputType({ description: "Update user input" })
export class UpdateUserInput {
	@Field()
	id: ObjectId

	@Field(type => GraphQLJSONObject)
	patch: object

	@Field({ nullable: true, })
	updatedAt?: Date
}

@InputType({ description: 'Login user input' })
export class LoginUserInput implements Partial<User>{
	@Length(1, 255)
	@Field()
	username: string

	@Field()
	password: string
}