import { useClientOnlyValue } from '@/ui/hooks/useClientOnlyValue'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name='tab1'
        options={{
          title: 'Tab 1',
          tabBarIcon: ({ color }) => <TabBarIcon name='star-o' color={color} />,
        }}
      />
      <Tabs.Screen
        name='tab2'
        options={{
          title: 'Tab 2',
          tabBarIcon: ({ color }) => <TabBarIcon name='star-o' color={color} />,
        }}
      />
    </Tabs>
  )
}
