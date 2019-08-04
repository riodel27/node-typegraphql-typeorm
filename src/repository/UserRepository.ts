import { getMongoRepository } from "typeorm";


import User from '../schemas/User'

export const UserRepository = () => {
	const userRepositoryTest = getMongoRepository(User)
	return userRepositoryTest
}