import { useState } from 'react'

import { Password } from '@/core/domain/structures'

export function usePasswordGenerator(
  minimumPasswordStrength: number,
  onConfirm?: (password: Password) => void,
) {
  const defaultPassword = Password.createFromStrength(minimumPasswordStrength)
  const [password, setPassword] = useState(defaultPassword)
  const [length, setLength] = useState(defaultPassword.length)
  const [hasUppercase, setHasUppercase] = useState(defaultPassword.hasUppercase)
  const [hasLowercase, setHasLowercase] = useState(defaultPassword.hasLowercase)
  const [hasNumbers, setHasNumbers] = useState(defaultPassword.hasNumbers)
  const [hasSymbols, setSymbols] = useState(defaultPassword.hasSymbols)
  const [isInvalid, setIsInvalid] = useState(false)

  function handleReload() {
    const password = Password.createRandom({
      length,
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSymbols,
    })
    setPassword(password)
  }

  function handleChange(value: string) {
    setPassword(Password.create(value))
    setIsInvalid(false)
  }

  function handleChangeLength(value: number) {
    setLength(value)
    setIsInvalid(false)
  }

  function handleChangeHasUppercase(value: boolean) {
    if (!value && !hasLowercase) {
      return
    }

    setHasUppercase(value)
    setIsInvalid(false)
  }

  function handleChangeHasLowercase(value: boolean) {
    if (!value && !hasUppercase) {
      return
    }

    setHasLowercase(value)
    setIsInvalid(false)
  }

  function handleChangeHasNumbers(value: boolean) {
    setHasNumbers(value)
    setIsInvalid(false)
  }

  function handleChangeSymbols(value: boolean) {
    setSymbols(value)
    setIsInvalid(false)
  }

  function handleConfirm() {
    setIsInvalid(false)
    if (password.strength < minimumPasswordStrength) {
      setIsInvalid(true)
      return
    }
    onConfirm?.(password)
  }

  function handleOpen() {
    const password = Password.createRandom({
      length: defaultPassword.length,
      hasUppercase: defaultPassword.hasUppercase,
      hasLowercase: defaultPassword.hasLowercase,
      hasNumbers: defaultPassword.hasNumbers,
      hasSymbols: defaultPassword.hasSymbols,
    })
    setPassword(password)
  }

  return {
    password,
    length,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols,
    isInvalid,
    handleChange,
    handleChangeLength,
    handleChangeHasUppercase,
    handleChangeHasLowercase,
    handleChangeHasNumbers,
    handleChangeSymbols,
    handleReload,
    handleConfirm,
    handleOpen,
  }
}
