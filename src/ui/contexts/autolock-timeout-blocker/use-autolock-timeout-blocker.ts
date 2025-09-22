import { type RefObject, useEffect, useRef } from 'react'
import type { Account } from '@/core/domain/entities'
import type { MasterPasswordConfirmationDialogRef } from '@/ui/components/master-password-confirmation-dialog/types'
import { AppState, type AppStateStatus, PanResponder } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

type Params = {
  account: Account | null
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
}

export function useAutoLockTimeoutBlocker({
  account,
  masterPasswordConfirmationDialogRef,
}: Params) {
  const timoutRef = useRef<number | null>(null)
  const isAppInForeground = useRef(AppState.currentState === 'active')
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

  const resetTimer = () => {
    if (!account?.autoLockTimeout) return
    if (timoutRef.current) clearTimeout(timoutRef.current)
    timoutRef.current = setTimeout(() => {
      masterPasswordConfirmationDialogRef?.current?.open()
    }, account.autoLockTimeout * 1000)
  }

  function handleCorrectMasterPasswordConfirmationDialogSubmit() {
    masterPasswordConfirmationDialogRef?.current?.close()
    resetTimer()
  }

  function handleAppStateChange(nextAppState: AppStateStatus) {
    if (nextAppState === 'active') {
      resetTimer()
      isAppInForeground.current = true
      return
    }

    if (timoutRef.current) clearTimeout(timoutRef.current)
    isAppInForeground.current = false
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange)
    return () => {
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    if (isFocused) {
      resetTimer()
    }
  }, [isFocused, resetTimer])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timoutRef.current) clearTimeout(timoutRef.current)
    }
  }, [])

  return {
    panResponder,
    handleCorrectMasterPasswordConfirmationDialogSubmit,
  }
}
