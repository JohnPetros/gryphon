import { STORAGE_KEYS } from '@/constants/storage-keys'
import { useSecureStore } from '@/ui/hooks/use-secure-store'
import { useState } from 'react'
import { Alert } from 'react-native'

type Props = {
  onCorrectPasswordSubmit: (masterPassword: string) => void
}

export function useMasterPasswordConfirmationDialog({ onCorrectPasswordSubmit }: Props) {
  const [masterPassword, setMasterPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const secureStore = useSecureStore()

  function open() {
    setIsOpen(true)
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

    console.log('correctMasterPassword', correctMasterPassword)
    console.log('masterPassword', masterPassword)

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
