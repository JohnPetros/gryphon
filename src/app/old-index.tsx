import { Box } from '../ui/gluestack/box'
import { Text } from '../ui/gluestack/text'

import { useRouter } from 'expo-router'

const Index = () => {
  const router = useRouter()
  return (
    <Box className='flex-1 bg-blue-700 h-[100vh]'>
      <Box className='flex flex-1 items-center mx-5 lg:my-24 lg:mx-32 py-safe'>
        <Box className='gap-10 base:flex-col sm:flex-row justify-between sm:w-[80%] md:flex-1'>
          <Box className='bg-background-template py-2 px-6 rounded-full items-center flex-column md:flex-row md:self-start'>
            <Text className='text-red-800 font-medium'>Get started by editing</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Index
