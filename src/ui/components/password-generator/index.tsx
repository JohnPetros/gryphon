import {
  type RefObject,
  useImperativeHandle,
  useRef,
  type PropsWithChildren,
} from 'react'

import type { Password } from '@/core/domain/structures'

import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { PasswordGeneratorView } from './password-generator-view'
import { usePasswordGenerator } from './use-password-generator'
import type { BottomSheetRef } from '../bottom-sheet/types'

type Props = {
  ref?: RefObject<BottomSheetRef | null>
  onConfirm?: (password: Password) => void
}

export const PasswordGenerator = ({
  children,
  ref,
  onConfirm,
}: PropsWithChildren<Props>) => {
  const bottomSheetRef = useRef<BottomSheetRef | null>(null)
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
  } = usePasswordGenerator({
    bottomSheetRef,
    minimumPasswordStrength: account?.minimumPasswordStrength || 3,
    onConfirm,
  })

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.open()
    },
    close: () => {
      bottomSheetRef.current?.close()
    },
  }))

  return (
    <PasswordGeneratorView
      bottomSheetRef={bottomSheetRef}
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
