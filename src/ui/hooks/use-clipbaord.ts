import * as Clipboard from 'expo-clipboard'
import { useCallback } from 'react'
import { useToast } from './use-toast'

export function useClipboard() {
  const toast = useToast()

  const copy = useCallback(async (text: string) => {
    await Clipboard.setStringAsync(text)
    toast.show('Copiado para a área de transferência', 'success')
  }, [])

  return {
    copy,
  }
}
