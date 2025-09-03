import { useState } from 'react'

import { Password } from '@/core/domain/structures'

export function useMasterPasswordForm(onCreate: (password: string) => void) {
  const [password, setPassword] = useState(Password.create(''))

  function handlePasswordChange(value: string) {
    setPassword(Password.create(value))
  }

  async function handleSubmit() {
    onCreate(password.value)
  }

  return {
    isPasswordValid: password.hasMinLength,
    handlePasswordChange,
    handleSubmit,
  }
}
