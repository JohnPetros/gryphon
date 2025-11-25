import { createContext, type PropsWithChildren } from 'react'

import type { ThemeContextValue } from './types/theme-context-value'
import { useThemeContextProvider } from './use-theme-context-provider'
import { useSecureStorage } from '@/ui/hooks/use-secure-storage'

export const ThemeContext = createContext({} as ThemeContextValue)

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const storageProvider = useSecureStorage()
  const value = useThemeContextProvider({ storageProvider })
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
