import { useEffect, useState } from 'react'
import { Appearance, useColorScheme } from 'react-native'

import type { ThemeContextValue } from './types/theme-context-value'
import type { StorageProvider } from '@/core/interfaces/providers'
import { STORAGE_KEYS } from '@/constants'
import { useAppState } from '@/ui/hooks/use-app-state'

type Theme = 'light' | 'dark'

type Params = {
  storageProvider: StorageProvider
}

export function useThemeContextProvider({ storageProvider }: Params): ThemeContextValue {
  const systemTheme = useColorScheme()
  const [theme, setTheme] = useState<Theme>(systemTheme === 'dark' ? 'dark' : 'light')
  const [isFromSystem, setIsFromSystem] = useState(Boolean(systemTheme))
  const [originalTheme, setOriginalTheme] = useState<Theme | null>(null)

  async function changeTheme(theme: Theme | 'system') {
    if (theme === 'system') {
      setTheme(originalTheme === 'dark' ? 'dark' : 'light')
      setIsFromSystem(true)
      await storageProvider.deleteItem(STORAGE_KEYS.theme)
      return
    }
    setTheme(theme)
    await storageProvider.setItem(STORAGE_KEYS.theme, theme)
    setIsFromSystem(false)
  }

  useEffect(() => {
    async function fetchTheme() {
      const savedTheme = await storageProvider.getItem(STORAGE_KEYS.theme)

      if (savedTheme) {
        setTheme(savedTheme as Theme)
        setIsFromSystem(false)
        return
      }
      const originalTheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
      setTheme(originalTheme)
      setOriginalTheme(theme)
      setIsFromSystem(true)
      await storageProvider.deleteItem(STORAGE_KEYS.theme)
    }
    fetchTheme()
  }, [])

  return {
    theme,
    isFromSystem,
    changeTheme,
  }
}
