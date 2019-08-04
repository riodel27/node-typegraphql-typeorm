import { UserInputError } from 'apollo-server'
import { ObjectId } from 'mongodb'
import * as R from 'ramda'
import { Query, Resolver, Field, Mutation, InputType, Arg } from 'type-graphql'
import { MaxLength, IsEmail } from "class-validator";

import User from '../schemas/User'
import { validateAddUser } from '../util/validators'
import { UserRepository } from '../repository/UserRepository'


@InputType({ description: "New user input" })
class AddUserInput implements Partial<User>{
	@Field()
	@MaxLength(10)
	readonly username: string /** readonly not working */

	@Field()
	email: string

	@Field({ nullable: true })
	createdAt?: Date
}

@InputType({ description: "Update user input" })
class UpdateUserInput implements Partial<User>{
	@Field({ nullable: true })
	@MaxLength(10)
	username?: string

	@Field({ nullable: true })
	@IsEmail() /** seems like custom validation error is much better as it should return a code maybe like BAD_USER_INPUT  but instead this is returning a INTERNAL_SERVER_ERROR*/
	email?: string
}


@Resolver(of => User)
export default class UserResolver {

	@Query(returns => User, { description: 'Get a User', nullable: true })
	async user(@Arg('id') id: string): Promise<User | undefined> {
		const user = await UserRepository().findOne(id)
		return user
	}

	@Query(returns => [User], { description: 'list of users' })
	async users(): Promise<User[]> {
		const allusers = await UserRepository().find()
		return allusers
	}

	@Mutation(returns => User, { description: "Add User" })
	async addUser(@Arg('data') newUserData: AddUserInput): Promise<User> {

		const { errors, valid } = validateAddUser(newUserData)

		if (R.not(valid)) {
			throw new UserInputError('Errors', { errors })
		}

		const newUser = await UserRepository().insertOne(newUserData)
		return newUser.ops[0]
	}

	@Mutation(returns => User, { description: "Update User", nullable: true })
	async updateUser(@Arg('id') id: ObjectId, @Arg('data') updateUserInputData: UpdateUserInput): Promise<User> {
		const updatedUser = await UserRepository().findOneAndUpdate({ _id: id }, { $set: updateUserInputData }, { returnOriginal: false })
		return updatedUser.value
	}

	@Mutation(returns => String, { description: "Delete User", nullable: true })
	async deleteUser(@Arg('id') id: ObjectId): Promise<any> {
		const deletedUser = await UserRepository().deleteOne({ _id: id })
		console.log('deleted user: ', deletedUser.deletedCount)
		return `user with id:${id} has been successfully deleted!`
	}
}