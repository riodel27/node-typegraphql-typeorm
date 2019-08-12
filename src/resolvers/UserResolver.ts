import { UserInputError } from 'apollo-server-express'
import { ObjectId } from 'mongodb'
import * as R from 'ramda'
import { Query, Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { hash } from 'bcryptjs';

import User from '../schemas/User'
import { validateCreateUser } from '../util/validators'
import { UserRepository } from '../repository/UserRepository'
import { AddUserInput, UpdateUserInput } from '../inputs/UserInput'
import { MyContext } from '../types/MyContext'
import { generateToken } from '../util/generateToken'


@Resolver(of => User)
export default class UserResolver {

	@Query(returns => User, { description: 'Get a User', nullable: true })
	async user(@Arg('id', { nullable: true, }) id: string, @Ctx() ctx: MyContext): Promise<User | undefined> {
		if (!ctx.req.session!.userId) throw new Error('You must be logged in')
		const userId = id ? id : ctx.req.session!.userId
		const user = await UserRepository().findOne(userId)
		return user
	}

	@Query(returns => [User], { description: 'list of users' })
	async users(@Ctx() ctx: MyContext): Promise<User[]> {
		if (!ctx.req.session!.userId) throw new Error('You must be logged in')
		const allusers = await UserRepository().find()
		return allusers
	}

	@Mutation(returns => User, { description: "create User" })
	async createUser(@Arg('input') newUserData: AddUserInput): Promise<User> {
		const { confirmPassword, ...userData } = newUserData
		/**validation*/
		const { errors, valid } = validateCreateUser(newUserData)
		if (R.not(valid)) {
			throw new UserInputError('Errors', { errors })
		}
		const hashPassword = await hash(userData.password, 12)
		const newUser = await UserRepository().insertOne({ ...userData, password: hashPassword })
		const token = generateToken(newUser.ops[0])
		return { ...newUser.ops[0], token }
	}

	@Mutation(returns => User, { description: "Update User", nullable: true })
	async updateUser(@Arg('input') updateUserInputData: UpdateUserInput): Promise<User> {
		const { id, patch } = updateUserInputData
		const updatedUser = await UserRepository().findOneAndUpdate({ _id: id }, { $set: { ...patch, updatedAt: new Date() } }, { returnOriginal: false })
		return updatedUser.value
	}

	@Mutation(returns => String, { description: "Delete User", nullable: true })
	async deleteUser(@Arg('id') id: ObjectId): Promise<any> {
		const deletedUser = await UserRepository().deleteOne({ _id: id })
		console.log('deleted user: ', deletedUser.deletedCount)
		return `user with id:${id} has been successfully deleted!`
	}

}