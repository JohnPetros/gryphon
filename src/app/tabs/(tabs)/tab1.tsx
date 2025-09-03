import { Text } from '@/ui/Themed'
import { Center } from '@/ui/gluestack/center'
import { Divider } from '@/ui/gluestack/divider'
import { Heading } from '@/ui/gluestack/heading'

export default function Tab2() {
  return (
    <Center className='flex-1'>
      <Heading className='font-bold text-2xl'>Expo - Tab 1</Heading>
      <Divider className='my-[30px] w-[80%]' />
      <Text className='p-4'>Example below to use gluestack-ui components.</Text>
    </Center>
  )
}
