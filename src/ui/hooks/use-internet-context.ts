import { useContext } from 'react'

import { AppError } from '@/core/domain/errors'
import { InternetContext } from '../contexts/internet-context'

export function useInternetContext() {
  const context = useContext(InternetContext)

  if (!context) {
    throw new AppError('InternetContext must be used within an InternetContextProvider')
  }

  return context
}
