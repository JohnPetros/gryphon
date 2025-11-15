import { useCallback } from 'react'
import * as FileSystem from 'expo-file-system'

import type { FileSystemProvider } from '@/core/interfaces/providers'

export function useFileSystemProvider(): FileSystemProvider {
  const write = useCallback(async (fileName: string, data: unknown) => {
    const fileUri = `${FileSystem.documentDirectory}${fileName}`
    await FileSystem.writeAsStringAsync(
      fileUri,
      typeof data === 'string' ? data : JSON.stringify(data),
    )
    return { fileUri }
  }, [])

  return {
    write,
  }
}
