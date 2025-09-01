import { useState } from 'react'

export function usePasswordInput() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function handlePasswordVisibilityButtonPress() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return { isPasswordVisible, handlePasswordVisibilityButtonPress }
}
