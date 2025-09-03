import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
}

export const AppNameView = ({ size = 'xl' }: Props) => {
  return (
    <Box className='flex flex-row items-center'>
      <Text className='text-primary' bold size={size}>
        Gry
      </Text>
      <Text className='text-accent' bold size={size}>
        phon
      </Text>
    </Box>
  )
}
