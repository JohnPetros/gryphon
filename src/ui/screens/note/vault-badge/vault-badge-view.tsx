import type { Vault } from '@/core/domain/entities'

import { Icon } from '@/ui/components/icon'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

type Props = {
  vault: Vault
}

export const VaultBadgeView = ({ vault }: Props) => {
  return (
    <Box className='flex-row gap-1 px-3 py-3 rounded bg-info-background w-max'>
      <Icon name={vault.icon} size={16} color='info' />
      <Text className='text-sm text-info w-max'>{vault.title}</Text>
    </Box>
  )
}
