/* eslint-disable no-console */
import ky from 'ky'

const apiUrl = process.env.EXPO_PUBLIC_API_URL

const getAuthToken = async () => {
	return 'your-access-token'
}

const instance = ky.extend({
	prefixUrl: apiUrl,
	timeout: 10000,
	retry: {
		limit: 2,
		statusCodes: [408, 500, 502, 503, 504],
	},
	hooks: {
		beforeRequest: [
			async request => {
				const token = await getAuthToken()
				if (token) {
					request.headers.set('Authorization', `Bearer ${token}`)
				}
				request.headers.set('Content-Type', 'application/json')
			},
		],
		afterResponse: [
			async (_request, _options, response) => {
				if (!response.ok) {
					const errorMessage = await response.text()
					throw new Error(`API Error ${response.status}: ${errorMessage}`)
				}
			},
		],
	},
	throwHttpErrors: true,
})

export const handleApiError = (error: unknown) => {
	if (error instanceof Error) {
		console.error('API Error:', error.message)
		return error.message
	}
	console.error('Unknown API Error:', error)
	return 'An unexpected error occurred. Please try again.'
}

export default instance
