import { useEffect } from 'react'
import { View, type ViewProps } from 'react-native'

import { config } from './config'
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator'
import { ToastProvider } from '@gluestack-ui/core/toast/creator'
import { useColorScheme } from 'nativewind'
import { COLORS } from '@/constants'

export type ModeType = 'light' | 'dark' | 'system'

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType
  children?: React.ReactNode
  style?: ViewProps['style']
}) {
  const { colorScheme, setColorScheme } = useColorScheme()

  useEffect(() => {
    setColorScheme(mode)
  }, [mode])

  return (
    <View
      style={[
        config[colorScheme as keyof typeof config],
        {
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: COLORS[colorScheme as keyof typeof COLORS].background,
        },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  )
}
