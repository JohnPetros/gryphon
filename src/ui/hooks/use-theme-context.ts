import { useContext } from 'react'

import { AppError } from '@/core/domain/errors'

import { ThemeContext } from '../contexts/theme-context'

export function useThemeContext() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new AppError('ThemeContext must be used within an ThemeContextProvider')
  }

  return context
}
