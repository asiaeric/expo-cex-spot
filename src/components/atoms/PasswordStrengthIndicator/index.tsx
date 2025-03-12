import React, { useMemo } from 'react'
import { View, ViewProps } from 'react-native'
import { useTheme } from '@/theme'
import PasswordRequirementRow from './PasswordRequireRow'
import { useTranslation } from 'react-i18next'

interface PasswordRequirement {
	label: string
	pattern: RegExp
}

interface PasswordRequirementsProps extends ViewProps {
	password: string
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
	password,
	onLayout,
}) => {
	const { gutters } = useTheme()
	const { t } = useTranslation(['signup'])

	const criteria: PasswordRequirement[] = useMemo(
		() => [
			{ label: t('signup:includeUpperLetters'), pattern: /[sDFdlA-Z]/ },
			{ label: t('signup:includeLowerLetters'), pattern: /[a-z]/ },
			{ label: t('signup:includeNumber'), pattern: /[0-9]/ },
			{ label: t('signup:includeSpecialLetters'), pattern: /[^A-Za-z0-9]/ },
			{ label: t('signup:atLeast8Characters'), pattern: /.{8,}/ },
		],
		[],
	)

	const checkCondition = (pattern: RegExp) => pattern.test(password)

	return (
		<View style={[gutters.marginTop_12]} onLayout={onLayout}>
			{criteria.map((e, i) => {
				const isFulfilled = checkCondition(e.pattern)
				return (
					<PasswordRequirementRow
						key={i}
						isFulfilled={isFulfilled}
						label={e.label}
					/>
				)
			})}
		</View>
	)
}

export default PasswordRequirements
