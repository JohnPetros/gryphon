import { useState } from 'react'

import { Password } from '@/core/domain/structures'

export function usePasswordInput(onChange: (value: string) => void) {
  const [password, setPassword] = useState(Password.create(''))
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function handlePasswordVisibilityButtonPress() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  function handleChange(value: string) {
    const password = Password.create(value)
    setPassword(password)
    onChange(password.value)
  }

  return {
    password,
    isPasswordVisible,
    handleChange,
    handlePasswordVisibilityButtonPress,
  }
}
