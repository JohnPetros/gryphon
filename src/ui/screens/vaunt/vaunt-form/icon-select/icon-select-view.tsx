import type { vaultIcon } from '@/core/domain/types'
import { Icon } from '@/ui/components/icon'
import { Box } from '@/ui/gluestack/box'
import { Pressable } from '@/ui/gluestack/pressable'

type Props = {
  value: vaultIcon
  onSelect: (icon: string) => void
}

export const IconSelectView = ({ value, onSelect }: Props) => {
  return (
    <Pressable onPress={() => onSelect(value)}>
      <Box className='flex items-center justify-center gap-2 h-16 w-16'>
        <Icon name={value} />
      </Box>
    </Pressable>
  )
}
