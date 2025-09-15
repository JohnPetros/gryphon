import type { PropsWithChildren } from 'react'

import { Password } from '@/core/domain/structures'

import { PasswordGeneratorView } from './password-generator-view'
import { usePasswordGenerator } from './use-password-generator'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

type Props = {
  onConfirm?: (password: Password) => void
}

export const PasswordGenerator = ({ children, onConfirm }: PropsWithChildren<Props>) => {
  const { account } = useAuthContext()
  const {
    password,
    length,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols,
    isInvalid,
    handleReload,
    handleChange,
    handleChangeLength,
    handleConfirm,
    handleChangeHasUppercase,
    handleChangeHasLowercase,
    handleChangeHasNumbers,
    handleOpen,
    handleChangeSymbols,
  } = usePasswordGenerator(account?.minimumPasswordStrength || 3, onConfirm)

  return (
    <PasswordGeneratorView
      password={password}
      length={length}
      hasUppercase={hasUppercase}
      hasLowercase={hasLowercase}
      hasNumbers={hasNumbers}
      hasSymbols={hasSymbols}
      isInvalid={isInvalid}
      onOpen={handleOpen}
      onReload={handleReload}
      onChange={handleChange}
      onChangeLength={handleChangeLength}
      onChangeHasUppercase={handleChangeHasUppercase}
      onChangeHasLowercase={handleChangeHasLowercase}
      onChangeHasNumbers={handleChangeHasNumbers}
      onChangeSymbols={handleChangeSymbols}
      onConfirm={onConfirm ? handleConfirm : undefined}
    >
      {children}
    </PasswordGeneratorView>
  )
}
