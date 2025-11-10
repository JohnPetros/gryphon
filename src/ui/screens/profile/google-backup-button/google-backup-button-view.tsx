import { Pressable } from '@/ui/components/pressable'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

type Props = {
  onPress: () => void
}

export const GoogleBackupButtonView = ({ onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Box>
        <Text>Fazer backup no Google Drive</Text>
      </Box>
    </Pressable>
  )
}
