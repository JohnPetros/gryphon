import { Text } from '@/ui/gluestack/text'
import { COLORS } from '@/constants'
import { Icon } from '../../icon'
import { Pressable } from '../../pressable'
import type { IconName } from '../../icon/types'

type Props = {
  color: keyof typeof COLORS.dark
  icon: IconName
  children: string
  onPress: () => void
}

export const AppItemMenuOptionView = ({
  children,
  color = 'neutral',
  icon,
  onPress,
}: Props) => {
  return (
    <Pressable
      className='flex-row items-center gap-2 py-6 border-b border-neutral '
      onPress={onPress}
    >
      <Icon name={icon} color={color} size={20} />
      <Text className='text-lg' style={{ color: COLORS.dark[color] }}>
        {children}
      </Text>
    </Pressable>
  )
}
