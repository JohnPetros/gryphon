import { CLIENT_ENV } from '@/constants'
import { STORAGE_KEYS } from '@/constants/storage-keys'
import type { CryptoProvider, StorageProvider } from '@/core/interfaces/providers'
import { useState } from 'react'
import { Alert } from 'react-native'

type Props = {
  isMasterPasswordRequired: boolean
  kcv?: string
  encryptionSalt: string
  storageProvider: StorageProvider
  cryptoProvider: CryptoProvider
  onCorrectPasswordSubmit: (masterPassword: string) => void
}

export function useMasterPasswordConfirmationDialog({
  isMasterPasswordRequired,
  kcv,
  encryptionSalt,
  storageProvider,
  cryptoProvider,
  onCorrectPasswordSubmit,
}: Props) {
  const [masterPassword, setMasterPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    if (isMasterPasswordRequired) {
      setIsOpen(true)
      return
    }
    onCorrectPasswordSubmit(masterPassword)
  }

  function close() {
    setMasterPassword('')
    setIsOpen(false)
  }

  function handlePasswordChange(password: string) {
    setMasterPassword(password)
  }

  async function handlePasswordSubmit() {
    if (kcv) {
      const encryptionKey = await cryptoProvider.deriveKey(masterPassword, encryptionSalt)
      const kcvText = cryptoProvider.decrypt(kcv, encryptionKey)
      if (!kcvText || kcvText !== CLIENT_ENV.kcvText) {
        Alert.alert('Senha mestra incorreta')
        return
      }
      await storageProvider.setItem(STORAGE_KEYS.masterPassword, masterPassword)
      onCorrectPasswordSubmit(masterPassword)
      return
    }

    const correctMasterPassword = await storageProvider.getItem(
      STORAGE_KEYS.masterPassword,
    )

    console.log({ correctMasterPassword })

    if (correctMasterPassword === masterPassword) {
      onCorrectPasswordSubmit(masterPassword)
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
