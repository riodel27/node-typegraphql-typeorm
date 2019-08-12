
import { ObjectId } from 'mongodb'
import { sign } from 'jsonwebtoken'

import { secret } from '../config'

type TOKEN_PARAMS = {
	_id: ObjectId
	email: string
	username: string
}

export const generateToken = ({ _id, email, username }: TOKEN_PARAMS): string => {
	return sign({
		id: _id,
		email,
		username
	}, secret, { expiresIn: '1h' })
}