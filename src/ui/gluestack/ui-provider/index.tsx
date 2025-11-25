import { useThemeContext } from '@/ui/hooks/use-theme-context'
import { GluestackUIProvider } from '../gluestack-ui-provider'

export const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, isFromSystem } = useThemeContext()

  return (
    <GluestackUIProvider mode={isFromSystem ? 'system' : theme}>
      {children}
    </GluestackUIProvider>
  )
}
