import { STORAGE_KEYS } from '@/constants/storage-keys'
import type { StorageProvider } from '@/core/interfaces/providers'
import { useState } from 'react'
import { Alert } from 'react-native'

type Props = {
  isMasterPasswordRequired: boolean
  storageProvider: StorageProvider
  onCorrectPasswordSubmit: () => void
}

export function useMasterPasswordConfirmationDialog({
  isMasterPasswordRequired,
  storageProvider,
  onCorrectPasswordSubmit,
}: Props) {
  const [masterPassword, setMasterPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    if (isMasterPasswordRequired) {
      setIsOpen(true)
      return
    }
    onCorrectPasswordSubmit()
  }

  function close() {
    setMasterPassword('')
    setIsOpen(false)
  }

  function handlePasswordChange(password: string) {
    setMasterPassword(password)
  }

  async function handlePasswordSubmit() {
    const correctMasterPassword = await storageProvider.getItem(
      STORAGE_KEYS.masterPassword,
    )

    if (correctMasterPassword === masterPassword) {
      onCorrectPasswordSubmit()
      return
    }
    Alert.alert('Senha mestra incorreta')
  }

  return {
    isOpen,
    open,
    close,
    handlePasswordChange,
    handlePasswordSubmit,
  }
}
