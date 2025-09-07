import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

type Props = {
  name: string
  description: string
}

export const AppItemInfoView = ({ name, description }: Props) => {
  return (
    <Box>
      <Text className='text-md text-accent'>{name}</Text>
      <Text className='text-sm text-neutral'>{description}</Text>
    </Box>
  )
}
