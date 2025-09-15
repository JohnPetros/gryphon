import type { PropsWithChildren } from 'react'

import type { Password } from '@/core/domain/structures'

import { PasswordGeneratorView } from './password-generator-view'
import { usePasswordGenerator } from './use-password-generator'

type Props = {
  onConfirm?: (password: Password) => void
}

export const PasswordGenerator = ({ children, onConfirm }: PropsWithChildren<Props>) => {
  const {
    password,
    characterLength,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSpecialChar,
    handleReload,
    handleChange,
    handleChangeCharacterLength,
    handleConfirm,
    handleChangeHasUppercase,
    handleChangeHasLowercase,
    handleChangeHasNumbers,
    handleChangeHasSpecialChar,
  } = usePasswordGenerator(onConfirm)

  return (
    <PasswordGeneratorView
      password={password}
      characterLength={characterLength}
      hasUppercase={hasUppercase}
      hasLowercase={hasLowercase}
      hasNumbers={hasNumbers}
      hasSpecialChar={hasSpecialChar}
      onReload={handleReload}
      onChange={handleChange}
      onChangeCharacterLength={handleChangeCharacterLength}
      onChangeHasUppercase={handleChangeHasUppercase}
      onChangeHasLowercase={handleChangeHasLowercase}
      onChangeHasNumbers={handleChangeHasNumbers}
      onChangeHasSpecialChar={handleChangeHasSpecialChar}
      onConfirm={onConfirm ? handleConfirm : undefined}
    >
      {children}
    </PasswordGeneratorView>
  )
}
