import { useState } from 'react'

import { Password } from '@/core/domain/structures'

export function usePasswordGenerator(onConfirm?: (password: Password) => void) {
  const [password, setPassword] = useState(Password.create(''))
  const [characterLength, setCharacterLength] = useState(8)
  const [hasUppercase, setHasUppercase] = useState(true)
  const [hasLowercase, setHasLowercase] = useState(false)
  const [hasNumbers, setHasNumbers] = useState(false)
  const [hasSpecialChar, setHasSpecialChar] = useState(false)

  function handleReload() {
    setPassword(Password.create(''))
  }

  function handleChange(value: string) {
    setPassword(Password.create(value))
  }

  function handleChangeCharacterLength(value: number) {
    setCharacterLength(value)
  }

  function handleChangeHasUppercase(value: boolean) {
    setHasUppercase(value)
  }

  function handleChangeHasLowercase(value: boolean) {
    setHasLowercase(value)
  }

  function handleChangeHasNumbers(value: boolean) {
    setHasNumbers(value)
  }

  function handleChangeHasSpecialChar(value: boolean) {
    setHasSpecialChar(value)
  }

  function handleConfirm() {
    onConfirm?.(password)
  }

  return {
    password,
    characterLength,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSpecialChar,
    handleChange,
    handleChangeCharacterLength,
    handleChangeHasUppercase,
    handleChangeHasLowercase,
    handleChangeHasNumbers,
    handleChangeHasSpecialChar,
    handleReload,
    handleConfirm,
  }
}
