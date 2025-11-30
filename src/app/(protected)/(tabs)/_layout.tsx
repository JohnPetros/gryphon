import { Tabs } from 'expo-router'

import { Icon } from '@/ui/components/icon'
import { useThemeContext } from '@/ui/hooks/use-theme-context'
import { COLORS } from '@/constants'

const Layout = () => {
  const { theme } = useThemeContext()
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingTop: 12,
          backgroundColor: COLORS[theme].background,
        },
      }}
    >
      <Tabs.Screen
        name='vault-itens'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon name='list' size={28} color={focused ? 'primary' : 'neutral'} />
          ),
        }}
      />
      <Tabs.Screen
        name='new-item'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon name='plus' size={24} color={focused ? 'primary' : 'neutral'} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon name='profile' size={24} color={focused ? 'primary' : 'neutral'} />
          ),
        }}
      />
    </Tabs>
  )
}

export default Layout
