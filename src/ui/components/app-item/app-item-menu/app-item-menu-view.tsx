import type { RefObject } from 'react'

import { BottomSheet } from '../../bottom-sheet'
import { Icon } from '../../icon'
import type { BottomSheetRef } from '../../bottom-sheet/types'
import { Box } from '@/ui/gluestack/box'

type Props = {
  ref: RefObject<BottomSheetRef | null>
  close: () => void
  children: (close: () => void) => React.ReactNode
}

export const AppItemMenuView = ({ children, ref, close }: Props) => {
  return (
    <BottomSheet ref={ref} trigger={<Icon name='menu' />}>
      <Box className='px-6'>{children(close)}</Box>
    </BottomSheet>
  )
}
