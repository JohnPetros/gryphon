import type { ClassNameValue } from 'tailwind-merge'

import { Badge, BadgeIcon, BadgeText } from '@/ui/gluestack/badge'
import { Icon } from '../icon'
import type { IconName } from '../icon/types'
import { COLORS } from '@/constants'
import { mergeClassNames } from '@/ui/utils'

type Color = 'primary' | 'danger' | 'warning' | 'info'
type BackgroundColor =
  | 'primaryBackground'
  | 'dangerBackground'
  | 'warningBackground'
  | 'infoBackground'

const BACKGROUND_COLORS: Record<Color, BackgroundColor> = {
  primary: 'primaryBackground',
  danger: 'dangerBackground',
  warning: 'warningBackground',
  info: 'infoBackground',
}

type Props = {
  message: string
  color: 'primary' | 'danger' | 'warning' | 'info'
  icon: IconName
  className?: ClassNameValue
}

export const BadgeView = ({ message, color, icon, className }: Props) => {
  return (
    <Badge
      style={{ backgroundColor: COLORS.dark[BACKGROUND_COLORS[color]] }}
      className={mergeClassNames('flex gap-1 rounded-md', className)}
    >
      {message && (
        <BadgeText className='text-md' style={{ color: COLORS.dark[color] }}>
          {message}
        </BadgeText>
      )}
      <BadgeIcon as={() => <Icon name={icon} color={color} size={16} />} />
    </Badge>
  )
}
