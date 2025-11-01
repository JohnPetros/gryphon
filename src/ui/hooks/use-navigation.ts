import { useCallback } from 'react'
import { type RelativePathString, useRouter } from 'expo-router'

import type { NavigationProvider } from '@/core/interfaces/providers/navigation-provider'

export function useNavigation(): NavigationProvider {
  const router = useRouter()

  const navigate = useCallback(
    (name: string, params?: any) => {
      router.push({
        pathname: name as RelativePathString,
        params,
      })
    },
    [router],
  )

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return {
    navigate,
    goBack,
  }
}
