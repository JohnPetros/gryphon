import { type RefObject, useEffect, useState } from 'react'

import { Password } from '@/core/domain/structures'
import type { BottomSheetRef } from '../bottom-sheet/types'
import { Keyboard } from 'react-native'

type Props = {
  passwordGeneratorRef: RefObject<BottomSheetRef | null>
  defaultValue: string
  onChange: (value: string) => void
}

export function usePasswordInput({
  passwordGeneratorRef,
  defaultValue,
  onChange,
}: Props) {
  const [password, setPassword] = useState(Password.create(defaultValue))
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordGeneratorVisible, setIsPasswordGeneratorVisible] = useState(false)

  function handlePasswordVisibilityButtonPress() {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
  }

  function handlePasswordGeneratorButtonPress() {
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
    handlePasswordGeneratorButtonPress,
    handlePasswordGeneratorConfirm,
  }
}
