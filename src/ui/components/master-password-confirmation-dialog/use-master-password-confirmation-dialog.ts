import { STORAGE_KEYS } from '@/constants/storage-keys'
import { useSecureStore } from '@/ui/hooks/use-secure-store'
import { useState } from 'react'
import { Alert } from 'react-native'

type Props = {
  isMasterPasswordRequired: boolean
  onCorrectPasswordSubmit: () => void
}

export function useMasterPasswordConfirmationDialog({ isMasterPasswordRequired, onCorrectPasswordSubmit }: Props) {
  const [masterPassword, setMasterPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const secureStore = useSecureStore()

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
    const correctMasterPassword = await secureStore.getItem(STORAGE_KEYS.masterPassword)

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
