import * as Clipboard from 'expo-clipboard'
import { useCallback } from 'react'

export function useClipboard() {
  const copy = useCallback(async (text: string) => {
    await Clipboard.setStringAsync(text)
  }, [])

  return {
    copy,
  }
}
