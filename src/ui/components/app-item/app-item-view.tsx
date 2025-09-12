import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

type Props = {
  name: string
  description: string
}

export const AppItemView = ({ name, description }: Props) => {
  return (
    <Box>
      <Text>{name}</Text>
      <Text>{description}</Text>
    </Box>
  )
}
