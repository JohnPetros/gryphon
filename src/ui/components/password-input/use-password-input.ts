import { useEffect, useState } from 'react'

import { Password } from '@/core/domain/structures'

export function usePasswordInput(
  onChange: (value: string) => void,
  defaultValue: string,
) {
  const [password, setPassword] = useState(Password.create(defaultValue))
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function handlePasswordVisibilityButtonPress() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  function handleChange(value: string) {
    const password = Password.create(value)
    setPassword(password)
    onChange(password.value)
  }

  useEffect(() => {
    setPassword(Password.create(defaultValue))
  }, [defaultValue])

  return {
    password,
    isPasswordVisible,
    handleChange,
    handlePasswordVisibilityButtonPress,
  }
}
