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
    <Portal key={String(isVisible)} isOpen={isVisible}>
      <Box className='bg-black pt-8 pb-3 w-screen'>{children}</Box>
    </Portal>
  )
}
