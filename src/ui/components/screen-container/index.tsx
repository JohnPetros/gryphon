import type { PropsWithChildren } from 'react'

import { useInternetContext } from '@/ui/hooks/use-internet-context'
import { ScreenContainerView } from './screen-container-view'

export const ScreenContainer = ({ children }: PropsWithChildren) => {
  const { isOffline } = useInternetContext()

  return <ScreenContainerView isOffline={isOffline}>{children}</ScreenContainerView>
}
