import { Box } from '@/ui/gluestack/box'
import { Icon } from '@/ui/components/icon'
import { COLORS } from '@/constants/colors'
import type { IconName } from '../../icon/types'
import { mergeClassNames } from '@/ui/utils'

type Props = {
  backgroundColor: keyof typeof COLORS.dark
  foregroundColor: keyof typeof COLORS.dark
  name: IconName
  size?: number
  className?: string
}

export const AppItemIconView = ({
  backgroundColor,
  foregroundColor,
  name,
  size = 28,
  className,
}: Props) => {
  return (
    <Box
      style={{
        backgroundColor: COLORS.dark[backgroundColor],
      }}
      className={mergeClassNames(
        'items-center justify-center w-16 h-16 rounded-md',
        className,
      )}
    >
      <Icon name={name} color={foregroundColor} size={size} />
    </Box>
  )
}
