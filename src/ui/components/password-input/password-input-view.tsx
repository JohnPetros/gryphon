import type { Password } from '@/core/domain/structures'

import { Box } from '@/ui/gluestack/box'
import { Icon } from '../icon'
import { Input } from '../input'
import { Pressable } from '../pressable'
import { PasswordStregth } from '../password-stregth'

type Props = {
  password: Password
  label: string
  hasStrength?: boolean
  isPasswordVisible: boolean
  isRequired: boolean
  onChange: (value: string) => void
  onPasswordVisibilityButtonPress: () => void
}

export const PasswordInputView = ({
  label,
  password,
  hasStrength = true,
  isPasswordVisible,
  isRequired,
  onChange,
  onPasswordVisibilityButtonPress,
}: Props) => {
  return (
    <Input
      type={isPasswordVisible ? 'text' : 'password'}
      label={label}
      isRequired={isRequired}
      icon='password'
      placeholder='*******'
      value={password.value}
      endContent={
        <Box className='flex-row gap-3'>
          {hasStrength && <PasswordStregth password={password} />}
          <Pressable onPress={onPasswordVisibilityButtonPress}>
            <Icon
              name={isPasswordVisible ? 'eye-close' : 'eye-open'}
              color='neutral'
              size={24}
            />
          </Pressable>
        </Box>
      }
      onChange={onChange}
    />
  )
}
