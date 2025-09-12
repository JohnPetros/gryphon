import { Box } from '@/ui/gluestack/box'
import { Icon } from '@/ui/components/icon'
import { COLORS } from '@/constants/colors'
import type { IconName } from '../../icon/types'

type Props = {
  backgroundColor: keyof typeof COLORS.dark
  foregroundColor: keyof typeof COLORS.dark
  name: IconName
}

export const AppItemIconView = ({ backgroundColor, foregroundColor, name }: Props) => {
  return (
    <Box
      style={{
        backgroundColor: COLORS.dark[backgroundColor],
      }}
      className='items-center justify-center w-16 h-16 rounded-md'
    >
      <Icon name={name} color={foregroundColor} size={28} />
    </Box>
  )
}
