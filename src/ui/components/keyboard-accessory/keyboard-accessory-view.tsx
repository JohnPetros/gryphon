import type { PropsWithChildren } from 'react'

import { Box } from '@/ui/gluestack/box'
import { Portal } from '@/ui/gluestack/portal'

type Props = {
  isVisible: boolean
}

export const KeyboardAccessoryView = ({
  children,
  isVisible,
}: PropsWithChildren<Props>) => {
  return (
    <Portal isOpen={isVisible}>
      <Box className='bg-black pt-16 pb-6 w-screen'>{children}</Box>
    </Portal>
  )
}
