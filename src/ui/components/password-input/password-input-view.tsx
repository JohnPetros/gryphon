import type { RefObject } from 'react'

import type { Password } from '@/core/domain/structures'

import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { Icon } from '../icon'
import { Input } from '../input'
import { Pressable } from '../pressable'
import { PasswordStregth } from '../password-stregth'
import { PasswordGenerator } from '../password-generator'
import { KeyboardAccessory } from '../keyboard-accessory'
import type { BottomSheetRef } from '../bottom-sheet/types'
import { MasterPasswordConfirmationDialog } from '../master-password-confirmation-dialog'
import type { MasterPasswordConfirmationDialogRef } from '../master-password-confirmation-dialog/types'

type Props = {
  password: Password
  label: string
  hasStrength?: boolean
  isPasswordVisible: boolean
  isPasswordGeneratorVisible: boolean
  isRequired: boolean
  isReadOnly: boolean
  passwordGeneratorRef: RefObject<BottomSheetRef | null>
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  onChange: (value: string) => void
  onFocus: () => void
  onBlur: () => void
  onPasswordVisibilityButtonPress: () => void
  onPasswordGeneratorConfirm: (password: Password) => void
  onPasswordGeneratorButtonPress: () => void
  onCorrectMasterPasswordConfirmationDialogSubmit: () => void
}

export const PasswordInputView = ({
  label,
  password,
  hasStrength = true,
  isPasswordVisible,
  isPasswordGeneratorVisible,
  masterPasswordConfirmationDialogRef,
  passwordGeneratorRef,
  isRequired,
  isReadOnly,
  onChange,
  onFocus,
  onBlur,
  onPasswordVisibilityButtonPress,
  onPasswordGeneratorConfirm,
  onPasswordGeneratorButtonPress,
  onCorrectMasterPasswordConfirmationDialogSubmit,
}: Props) => {
  return (
    <>
      <MasterPasswordConfirmationDialog
        ref={masterPasswordConfirmationDialogRef}
        description='Insira a senha mestra para para poder ver a senha da sua credencial.'
        onCorrectPasswordSubmit={onCorrectMasterPasswordConfirmationDialogSubmit}
      />
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        label={label}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        icon='password'
        placeholder='*******'
        value={password.value}
        onFocus={onFocus}
        onBlur={onBlur}
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

      <PasswordGenerator
        ref={passwordGeneratorRef}
        onConfirm={onPasswordGeneratorConfirm}
      />

      <KeyboardAccessory isVisible={isPasswordGeneratorVisible}>
        <Pressable
          onPress={onPasswordGeneratorButtonPress}
          className='flex-row items-center justify-center gap-2'
        >
          <Icon name='password' color='neutral' size={20} />
          <Text className='text-accent text-lg'>Gerar senha aleatória</Text>
        </Pressable>
      </KeyboardAccessory>
    </>
  )
}
