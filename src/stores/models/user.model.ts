import { Action, Thunk, action, thunk } from 'easy-peasy'
import { t } from 'i18next'

import { clearCredentials, storeCredentials } from '../secureMMKVStorage'

import { remove } from '@/components/atoms/Toast'
import { getMe, signIn, signUp } from '@/services/user'
import { SignInDTO, SignUpDTO, Token, User } from '@/types'
import { RouteName } from '@/types/navigation'
import { showSuccessModal } from '@/utils/PopUpHelpers'

type UserWithToken = User & Token
export interface UserState {
	user: Partial<UserWithToken> | undefined
	isSigning: boolean
	loginError: string
	signUpError: string
}

export interface UserActions {
	setUser: Action<this, Partial<UserWithToken>>
	setLoginError: Action<this, string>
	setSignUpError: Action<this, string>
	resetError: Action<this>
	setIsSigning: Action<this, boolean>
	logOut: Action<this>
}

export interface UserThunks {
	signIn: Thunk<this, SignInDTO>
	signUp: Thunk<this, SignUpDTO>
}

export interface UserModel extends UserState, UserActions, UserThunks {}

function handleLogin(params: SignInDTO) {
	storeCredentials(params.email, params.password)
	// navigationRef.navigate(RouteName.Main)
}

function handleLogout() {
	clearCredentials()
	remove('0')
	// reset(0, [{ name: RouteName.Login }])
}

export const userModel: UserModel = {
	user: {},
	loginError: '',
	signUpError: '',
	isSigning: false,
	setUser: action((state, payload) => {
		state.user = payload
	}),
	setIsSigning: action((state, payload) => {
		state.isSigning = payload
	}),
	setLoginError: action((state, payload) => {
		state.loginError = payload
	}),
	resetError: action(state => {
		state.loginError = ''
		state.signUpError = ''
	}),
	setSignUpError: action((state, payload) => {
		state.signUpError = payload
	}),
	logOut: action(state => {
		state.user = undefined
		state.loginError = ''
		state.signUpError = ''
		handleLogout()
	}),
	signIn: thunk(async (actions, payload, { getState }) => {
		try {
			const currentUser = getState().user
			const authData = await signIn(payload)
			actions.setUser({ ...currentUser, ...authData })
			const userData = await getMe()
			actions.setUser({ ...currentUser, ...userData })
			actions.resetError()
			actions.setUser(userData)
			handleLogin(payload)
		} catch (err) {
			actions.setLoginError(err.message)
		}
	}),
	signUp: thunk(async (actions, payload) => {
		try {
			await signUp(payload)
			showSuccessModal(t('signup:createAccountSuccessfully'))
			// navigate(RouteName.Login)
			actions.resetError()
		} catch (err) {
			actions.setSignUpError(err.code)
		}
	}),
}
