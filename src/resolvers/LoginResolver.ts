import { compare } from 'bcryptjs';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { UserInputError } from 'apollo-server-express'

import User from '../schemas/User'
import { MyContext } from '../types/MyContext'
import { UserRepository } from '../repository/UserRepository'
import { LoginUserInput } from '../inputs/UserInput'
import { generateToken } from '../util/generateToken'

@Resolver()
export class LoginResolver {
	@Mutation(() => User, { nullable: true })
	async login(@Arg('email') email: string, @Arg('password') password: string, @Ctx() ctx: MyContext): Promise<User | null> {
		const user = await UserRepository().findOne({ where: { email } })
		if (!user) return null
		const valid = await compare(password, user.password)
		if (!valid) return null
		ctx.req.session!.userId = user._id
		return user
	}
}

export class LoginResolverTokenBase {
	@Mutation(returns => User, { description: "login user" })
	async loginUser(@Arg('input') loginInput: LoginUserInput): Promise<User | undefined> {
		const { username, password } = loginInput
		const user = await UserRepository().findOne({ username })
		if (!user) throw new UserInputError('User not found')
		const match = await compare(password, user.password)
		if (!match) throw new UserInputError('Wrong credientials')
		const token = generateToken(user)
		return { ...user, token }
	}
}