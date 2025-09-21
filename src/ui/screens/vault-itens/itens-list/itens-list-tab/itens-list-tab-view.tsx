import type { PropsWithChildren } from 'react'

import { Text } from '@/ui/gluestack/text'
import { Pressable } from '@/ui/components/pressable'

type Props = {
  itenCount: number
  onPress: () => void
}

export const ItensListTabView = ({
  children,
  itenCount,
  onPress,
}: PropsWithChildren<Props>) => {
  return (
    <Pressable
      onPress={onPress}
      className='flex-row items-center gap-3 rounded-lg border border-neutral-background p-3 px-4'
    >
      {children}
      <Text className='text-3xl font-bold'>{itenCount}</Text>
    </Pressable>
  )
}
