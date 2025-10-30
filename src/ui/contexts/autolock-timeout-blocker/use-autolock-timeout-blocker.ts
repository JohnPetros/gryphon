import { type RefObject, useCallback, useEffect, useRef } from 'react'
import { PanResponder } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import type { Account } from '@/core/domain/entities'
import type { MasterPasswordConfirmationDialogRef } from '@/ui/components/master-password-confirmation-dialog/types'

type Params = {
  account: Account | null
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
}

export function useAutoLockTimeoutBlocker({
  account,
  masterPasswordConfirmationDialogRef,
}: Params) {
  const timoutRef = useRef<number | null>(null)
  const isFocused = useIsFocused()
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        resetTimer()
        return false
      },
      onMoveShouldSetPanResponder: () => {
        resetTimer()
        return false
      },
    }),
  ).current

  const resetTimer = useCallback(() => {
    if (!account?.autoLockTimeout) return
    if (timoutRef.current) clearTimeout(timoutRef.current)
    timoutRef.current = setTimeout(() => {
      // masterPasswordConfirmationDialogRef?.current?.open()
    }, account.autoLockTimeout * 1000)
  }, [account?.autoLockTimeout, masterPasswordConfirmationDialogRef])

  function handleCorrectMasterPasswordConfirmationDialogSubmit() {
    masterPasswordConfirmationDialogRef?.current?.close()
    resetTimer()
  }

  useEffect(() => {
    if (isFocused) resetTimer()
    return () => {
      if (timoutRef.current) clearTimeout(timoutRef.current)
    }
  }, [isFocused, resetTimer])

  useEffect(() => {
    if (account) resetTimer()
    return () => {
      if (timoutRef.current) clearTimeout(timoutRef.current)
    }
  }, [account, resetTimer])

  return {
    panResponder,
    handleCorrectMasterPasswordConfirmationDialogSubmit,
  }
}
