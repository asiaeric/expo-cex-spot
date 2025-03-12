import type { StackScreenProps } from '@react-navigation/stack'

export type ApplicationStackParamList = {
	SignIn: undefined,
    SignUp: undefined
}

export type ApplicationScreenProps = StackScreenProps<ApplicationStackParamList>

export enum RouteName {
	SignIn = 'SignIn',
    SignUp = 'SignUp',
}
