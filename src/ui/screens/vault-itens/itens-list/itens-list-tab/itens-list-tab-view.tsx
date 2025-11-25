import type { PropsWithChildren } from 'react'

import { Text } from '@/ui/gluestack/text'
import { Pressable } from '@/ui/components/pressable'
import { mergeClassNames } from '@/ui/utils'

type Props = {
  itenCount: number
  className?: string
  onPress: () => void
}

export const ItensListTabView = ({
  children,
  itenCount,
  className,
  onPress,
}: PropsWithChildren<Props>) => {
  return (
    <Pressable
      onPress={onPress}
      className={mergeClassNames(
        'flex-row items-center gap-3 rounded-lg border border-neutral-background p-3 px-4',
        className,
      )}
    >
      {children}
      <Text className='text-3xl font-bold'>{itenCount}</Text>
    </Pressable>
  )
}
