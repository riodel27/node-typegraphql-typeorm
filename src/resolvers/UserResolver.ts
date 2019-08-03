import { Query, Resolver, Field, ObjectType, Mutation, InputType, Arg } from 'type-graphql'
import User from '../schemas/User'
import { getRepository, getMongoManager, getMongoRepository, getManager } from "typeorm";
import { ObjectId } from 'mongodb'


@InputType({ description: "New user data" })
class AddUserInput implements Partial<User>{
	@Field()
	username: string
	@Field()
	email: string
}

@InputType({ description: "Update user input" })
class UpdateUserInput implements Partial<User>{
	@Field({ nullable: true })
	username?: string
	@Field({ nullable: true })
	email?: string
}



@Resolver(of => User)
export default class UserResolver {

	@Query(returns => [User], { description: 'list of users' })
	async users() {
		const userRepository = getMongoRepository(User)
		const allusers = await userRepository.find()
		return allusers
	}

	@Mutation(returns => User, { description: "Add User" })
	async addUser(@Arg('data') newUserData: AddUserInput): Promise<User> {
		const userRepository = getMongoRepository(User)
		const newUser = await userRepository.insertOne(newUserData)
		return newUser.ops[0]
	}

	@Mutation(returns => User, { description: "Update User" })
	async updateUser(@Arg('id') id: ObjectId, @Arg('data') updateUserInputData: UpdateUserInput): Promise<User> {
		const userRepository = getMongoRepository(User)
		const updatedUser = await userRepository.findOneAndUpdate({ _id: id }, { $set: updateUserInputData }, { returnOriginal: false })
		console.log('updated user: ', updatedUser)
		/** error handling 
		 *  ? how to handle return value of null. meaning trying to update a non existing user.
		*/
		return updatedUser.value
	}

	@Mutation(returns => String, { description: "Delete User" })
	async deleteUser(@Arg('id') id: ObjectId): Promise<any> {
		const userRepository = getMongoRepository(User)
		const deletedUser = await userRepository.deleteOne({ _id: id })
		/**error handling for scenario like trying to delete a non existing user */
		return `user with id:${id} has been successfully deleted!`
	}
}