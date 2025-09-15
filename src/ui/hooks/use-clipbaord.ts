// import * as Clipboard from 'expo-clipboard'
import { useCallback } from 'react'
import { useToast } from './use-toast'

export function useClipboard() {
  const { show } = useToast()

  const copy = useCallback(
    async (text: string) => {
      // await Clipboard.setStringAsync(text)
      show('Copiado para a área de transferência', 'success')
    },
    [show],
  )

  return {
    copy,
  }
}
