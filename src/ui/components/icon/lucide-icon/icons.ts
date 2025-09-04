import {
  Mail,
  ChevronDown,
  ChevronUp,
  KeyRound,
  LogOut,
  type LucideIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-react-native'

import type { IconName } from '../types/icon-name'

export const ICONS: Record<IconName, LucideIcon> = {
  'arrow-down': ChevronDown,
  'arrow-up': ChevronUp,
  'eye-open': EyeIcon,
  'eye-close': EyeOffIcon,
  email: Mail,
  password: KeyRound,
  exit: LogOut,
}
