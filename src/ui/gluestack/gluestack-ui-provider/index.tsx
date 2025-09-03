import { useEffect } from 'react'
import { config } from './config'
import { View, ViewProps } from 'react-native'
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator'
import { ToastProvider } from '@gluestack-ui/core/toast/creator'
import { useColorScheme } from 'nativewind'

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
        config[colorScheme!],
        { flex: 1, height: '100%', width: '100%', backgroundColor: 'blue' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  )
}
