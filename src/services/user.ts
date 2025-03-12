import instance from './instance'

import { TokenSchema, UserSchema } from '@/schemas'
import { SignInDTO } from '@/types'
const apiUrl = process.env.EXPO_PUBLIC_OLD_API_URL
console.log("apiUrl", apiUrl)

export const signIn = async (params: SignInDTO) => {
	try {
		const response = await instance
			.extend({ prefixUrl: '' })
			.post(`${apiUrl}auth/login`, { json: params })
			.json()

		return TokenSchema.parse(response)
	} catch (error) {
		console.error('Error signing in:', error)
		throw new Error('Failed to sign in. Please try again.')
	}
}

export const signUp = async (params: SignInDTO) => {
	try {
		const response = await instance
			.extend({ prefixUrl: '' })
			.post(`${apiUrl}auth/login`, { json: params })
			.json()

		return TokenSchema.parse(response)
	} catch (error) {
		console.error('Error signing in:', error)
		throw new Error('Failed to sign in. Please try again.')
	}
}

export const getMe = async () => {
	try {
		const response = await instance
			.extend({ prefixUrl: '' })
			.get(`${apiUrl}auth/me`)
			.json()

		return UserSchema.parse(response)
	} catch (error) {
		console.error('Error fetching user data:', error)
		throw new Error('Failed to fetch user data.')
	}
}
