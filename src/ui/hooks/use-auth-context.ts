import { useContext } from 'react'

import { AppError } from '@/core/domain/errors'
import { AuthContext } from '../contexts/auth-context'

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new AppError('AuthContext must be used within an AuthContextProvider')
  }

  return context
}
