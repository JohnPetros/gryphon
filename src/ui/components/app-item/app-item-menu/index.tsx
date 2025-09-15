import { useRef } from 'react'
import type { BottomSheetRef } from '../../bottom-sheet/types'

import { AppItemMenuView } from './app-item-menu-view'

type Props = {
  children: (close: () => void) => React.ReactNode
}

export const AppItemMenu = ({ children }: Props) => {
  const ref = useRef<BottomSheetRef | null>(null)

  return (
    <AppItemMenuView ref={ref} close={() => ref.current?.close()}>
      {children}
    </AppItemMenuView>
  )
}
