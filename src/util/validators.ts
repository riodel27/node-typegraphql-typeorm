type User = {
	username: string
	email: string
	createdAt?: Date
}

type Errors = {
	email: string
}

type ErrorObject = {
	errors: Errors
	valid: boolean
}


export const validateAddUser = ({ username, email }: User): ErrorObject => {
	const errors = <Errors>{}
	if (email.trim() === '') {
		errors.email = "Email must not be empty"
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!email.match(regEx)) {
			errors.email = 'Email must be a valid email address';
		}
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1
	}
}
