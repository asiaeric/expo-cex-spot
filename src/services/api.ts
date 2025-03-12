import api, { handleApiError } from './instance'

// ✅ GET Request (with optional query params)
export const fetchData = async <T>(
	endpoint: string,
	params?: Record<string, any>,
): Promise<T> => {
	try {
		const searchParams = params ? new URLSearchParams(params).toString() : ''
		return await api.get(`${endpoint}?${searchParams}`).json<T>()
	} catch (error) {
		throw new Error(handleApiError(error))
	}
}

// ✅ POST Request (with body and optional headers)
export const postData = async <T>(
	endpoint: string,
	data: object,
	headers?: Record<string, string>,
): Promise<T> => {
	try {
		return await api.post(endpoint, { json: data, headers }).json<T>()
	} catch (error) {
		throw new Error(handleApiError(error))
	}
}

// ✅ PUT Request (with body and optional headers)
export const putData = async (
	endpoint: string,
	data: object,
	headers?: Record<string, string>,
) => {
	try {
		return await api.put(endpoint, { json: data, headers }).json()
	} catch (error) {
		throw new Error(handleApiError(error))
	}
}

// ✅ DELETE Request (with optional body)
export const deleteData = async (endpoint: string, body?: object) => {
	try {
		return await api.delete(endpoint, { json: body }).json()
	} catch (error) {
		throw new Error(handleApiError(error))
	}
}
