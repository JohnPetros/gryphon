import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

type Props = {
  items: string[]
}

export const ListView = ({ items }: Props) => {
  return (
    <Box className='flex flex-col gap-3 pr-6'>
      {items.map((item) => (
        <Box key={item} className='flex flex-row gap-2'>
          <Text className='text-primary'>.</Text>
          <Text className='text-neutral'>{item}</Text>
        </Box>
      ))}
    </Box>
  )
}
