import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

const Index = () => {
  return (
    <Box className='flex-1 h-[100vh] bg-dark-gray'>
      <Box className='flex flex-1 items-center mx-5 lg:my-24 lg:mx-32 py-safe'>
        <Box className='gap-10 base:flex-col sm:flex-row justify-between sm:w-[80%] md:flex-1'>
          <Box className='bg-background-template py-2 px-6 rounded-full items-center flex-column md:flex-row md:self-start'>
            <Text className='text-black font-medium ml-2'>10</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Index
