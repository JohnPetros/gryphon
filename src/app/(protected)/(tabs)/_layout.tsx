import { Tabs } from 'expo-router'

import { Icon } from '@/ui/components/icon'

const Layout = () => {
  return (
    <Tabs screenOptions={{ tabBarStyle: { height: 80, paddingTop: 12 } }}>
      <Tabs.Screen
        name='vaults/[vaultId]'
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
