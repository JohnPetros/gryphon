import { type RefObject, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

import { Password } from '@/core/domain/structures'
import type { BottomSheetRef } from '../bottom-sheet/types'
import type { MasterPasswordConfirmationDialogRef } from '../master-password-confirmation-dialog/types/master-password-confirmation-dialog-ref'

type Props = {
  passwordGeneratorRef: RefObject<BottomSheetRef | null>
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  isMasterPasswordRequired: boolean
  defaultValue: string
  isProtected: boolean
  hasPasswordGenerator: boolean
  onChange: (value: string) => void
}

export function usePasswordInput({
  passwordGeneratorRef,
  masterPasswordConfirmationDialogRef,
  isMasterPasswordRequired,
  defaultValue,
  isProtected,
  hasPasswordGenerator,
  onChange,
}: Props) {
  const [password, setPassword] = useState(Password.create(defaultValue))
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordGeneratorVisible, setIsPasswordGeneratorVisible] = useState(false)

  function handlePasswordVisibilityButtonPress() {
    const shouldBeVisible = !isPasswordVisible
    if (shouldBeVisible && isProtected && isMasterPasswordRequired) {
      masterPasswordConfirmationDialogRef?.current?.open()
      return
    }
    setIsPasswordVisible(shouldBeVisible)
  }

  function handleCorrectMasterPasswordConfirmationDialogSubmit() {
    setIsPasswordVisible(true)
    masterPasswordConfirmationDialogRef?.current?.close()
  }

  function handlePasswordGeneratorButtonPress() {
    if (!hasPasswordGenerator) return
    passwordGeneratorRef?.current?.open()
    Keyboard.dismiss()
  }

  function handleChange(value: string) {
    const password = Password.create(value)
    setPassword(password)
    onChange(password.value)
  }

  function handleFocus() {
    setIsPasswordGeneratorVisible(true)
  }

  function handleBlur() {
    setIsPasswordGeneratorVisible(false)
  }

  function handlePasswordGeneratorConfirm(password: Password) {
    handleChange(password.value)
    passwordGeneratorRef?.current?.close()
  }

  useEffect(() => {
    setPassword(Password.create(defaultValue))
  }, [defaultValue])

  return {
    password,
    isPasswordVisible,
    isPasswordGeneratorVisible,
    handleChange,
    handleFocus,
    handleBlur,
    handlePasswordVisibilityButtonPress,
    handleCorrectMasterPasswordConfirmationDialogSubmit,
    handlePasswordGeneratorButtonPress,
    handlePasswordGeneratorConfirm,
  }
}
