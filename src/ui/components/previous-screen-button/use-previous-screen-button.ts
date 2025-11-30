import type { NavigationProvider } from '@/core/interfaces/providers'

type Params = {
  url?: string
  navigationProvider: NavigationProvider
}

export function usePreviousScreenButton({ url, navigationProvider }: Params) {
  function handlePress() {
    if (url) {
      navigationProvider.navigate(url)
      return
    }
    navigationProvider.goBack()
  }

  return {
    handlePress,
  }
}
