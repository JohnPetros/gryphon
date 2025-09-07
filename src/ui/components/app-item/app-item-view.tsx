import { Text } from '@/ui/gluestack/text'
import { Box } from 'lucide-react-native'

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
