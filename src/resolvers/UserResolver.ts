import { UserInputError } from 'apollo-server'
import { ObjectId } from 'mongodb'
import * as R from 'ramda'
import { Query, Resolver, Field, Mutation, InputType, Arg } from 'type-graphql'

import User from '../schemas/User'
import { validateAddUser } from '../util/validators'
import { UserRepository } from '../repository/UserRepository'
import { AddUserInput, UpdateUserInput } from '../inputs/UserInput'


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

	@Mutation(returns => User, { description: "create User" })
	async createUser(@Arg('input') newUserData: AddUserInput): Promise<User> {

		/**validation*/
		const { errors, valid } = validateAddUser(newUserData)

		if (R.not(valid)) {
			throw new UserInputError('Errors', { errors })
		}

		const newUser = await UserRepository().insertOne(newUserData)
		return newUser.ops[0]
	}

	@Mutation(returns => User, { description: "Update User", nullable: true })
	async updateUser(@Arg('input') updateUserInputData: UpdateUserInput): Promise<User> {
		const { id, patch, updatedAt } = updateUserInputData
		console.log('updatedAt: ', updatedAt)
		const updatedUser = await UserRepository().findOneAndUpdate({ _id: id }, { $set: { ...patch, updatedAt } }, { returnOriginal: false })
		return updatedUser.value
	}

	@Mutation(returns => String, { description: "Delete User", nullable: true })
	async deleteUser(@Arg('id') id: ObjectId): Promise<any> {
		const deletedUser = await UserRepository().deleteOne({ _id: id })
		console.log('deleted user: ', deletedUser.deletedCount)
		return `user with id:${id} has been successfully deleted!`
	}
}