import Gradient from '../assets/icons/Gradient'
import Logo from '../assets/icons/Logo'
import { Box } from '../ui/gluestack/box'
import { Text } from '../ui/gluestack/text'

import { Button, ButtonText } from '../ui/gluestack/button'
import { useRouter } from 'expo-router'

const Index = () => {
  const router = useRouter()
  return (
    <Box className='flex-1 h-[100vh]'>
      <Box className='absolute h-[500px] w-[500px] lg:w-[700px] lg:h-[700px]'>
        <Gradient />
      </Box>

      <Box className='flex flex-1 items-center mx-5 lg:my-24 lg:mx-32 py-safe'>
        <Box className='gap-10 base:flex-col sm:flex-row justify-between sm:w-[80%] md:flex-1'>
          <Box className='bg-background-template py-2 px-6 rounded-full items-center flex-column md:flex-row md:self-start'>
            <Text className='text-red-800 font-medium'>
              Get started by editing petros
            </Text>
            <Text className='text-white font-medium ml-2'>
              ./App.tsx or ./app/index.tsx (or whatever entry point you have)
            </Text>
          </Box>
          <Button
            size='md'
            className='bg-primary-500 px-6 py-2 rounded-full'
            onPress={() => {
              router.push('/tabs/tab1')
            }}
          >
            <ButtonText>Explore Tab Navigation</ButtonText>
          </Button>
        </Box>
        <Box className='flex-1 justify-center items-center h-96 w-[300px] lg:h-[160px] lg:w-[400px]'>
          <Logo />
        </Box>
      </Box>
    </Box>
  )
}

export default Index
