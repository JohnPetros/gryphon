import type { IconName } from '../types/icon-name'
import { ICONS } from './icons'
import { COLORS } from '@/constants'
import { useThemeContext } from '@/ui/hooks/use-theme-context'

type IconProps = {
  name: IconName
  color?: keyof typeof COLORS.dark
  size?: number
}

export const LucideIconView = ({ name, color = 'neutral', size = 24 }: IconProps) => {
  const { theme } = useThemeContext()
  const Icon = ICONS[name]
  return <Icon color={COLORS[theme][color]} size={size} />
}
