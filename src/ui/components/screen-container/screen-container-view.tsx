import type { PropsWithChildren } from 'react'

import { Box } from '@/ui/gluestack/box'
import { mergeClassNames } from '@/ui/utils'

type Props = {
  isOffline?: boolean
}

export const ScreenContainerView = ({
  children,
  isOffline,
}: PropsWithChildren<Props>) => {
  return (
    <Box
      className={mergeClassNames(
        'bg-red flex-1 h-full px-6 pt-16 bg-background',
        isOffline ? 'pt-24' : 'pt-16',
      )}
    >
      {children}
    </Box>
  )
}
