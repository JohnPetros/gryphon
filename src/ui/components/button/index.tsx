import type { PropsWithChildren } from 'react'

import { useThemeContext } from '@/ui/hooks/use-theme-context'
import { ButtonView } from './button-view'

type Props = {
  isLoading?: boolean
  isDisabled?: boolean
  className?: string
  onPress: () => void
}

export const Button = (props: PropsWithChildren<Props>) => {
  const { theme } = useThemeContext()
  return <ButtonView theme={theme} {...props} />
}
