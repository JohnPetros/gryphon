import {
  Mail,
  ChevronDown,
  ChevronUp,
  KeyRound,
  type LucideIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-react-native'

import type { IconName } from '../types/icon-name'

export const ICONS: Record<IconName, LucideIcon> = {
  'arrow-down': ChevronDown,
  'arrow-up': ChevronUp,
  email: Mail,
  password: KeyRound,
  'eye-open': EyeIcon,
  'eye-close': EyeOffIcon,
}
