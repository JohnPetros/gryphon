import type { ReactNode } from 'react'

import { Text } from '@/ui/gluestack/text'
import { COLORS } from '@/constants'
import { Icon } from '../../icon'
import { Pressable } from '../../pressable'
import type { IconName } from '../../icon/types'
import { Box } from '@/ui/gluestack/box'
import { mergeClassNames } from '@/ui/utils'

type Props = {
  color: keyof typeof COLORS.dark
  icon: IconName
  children: ReactNode
  className?: string
  onPress?: () => void
}

export const AppItemMenuOptionView = ({
  children,
  color = 'neutral',
  icon,
  className,
  onPress,
}: Props) => {
  if (onPress)
    return (
      <Pressable
        className='flex-row items-center gap-2 py-6 border-b border-neutral-background'
        onPress={onPress}
      >
        <Icon name={icon} color={color} size={20} />
        <Text
          className={mergeClassNames('text-lg', className)}
          style={{ color: COLORS.dark[color] }}
        >
          {children}
        </Text>
      </Pressable>
    )

  return (
    <Box className='flex-row items-center gap-2 py-6 border-b border-neutral-background'>
      <Icon name={icon} color={color} size={20} />
      <Text
        className={mergeClassNames('text-lg', className)}
        style={{ color: COLORS.dark[color] }}
      >
        {children}
      </Text>
    </Box>
  )
}
