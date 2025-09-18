import type { Vault } from '@/core/domain/entities'

import { Icon } from '@/ui/components/icon'
import { Pressable } from '@/ui/components/pressable'
import { Box } from '@/ui/gluestack/box'
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/ui/gluestack/select'
import { Text } from '@/ui/gluestack/text'

type Props = {
  vaults: Vault[]
  selectedVault: Vault | null
  onChange: (vaultId: string) => void
}

export const VaultSelectView = ({ vaults, selectedVault, onChange }: Props) => {
  return (
    <Select>
      <SelectTrigger className='w-48 h-16 bg-info-background justify-between px-4'>
        <Text className='text-lg text-accent'>{selectedVault?.title}</Text>
        <Icon name='arrow-down' color='accent' />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop className='bg-black' />
        <SelectContent className='px-12 py-4 min-h-64'>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator className='bg-accent' />
          </SelectDragIndicatorWrapper>
          {vaults.map((vault) => (
            <Pressable
              key={vault.id.value}
              onPress={() => onChange(vault.id.value)}
              className='flex-row items-center justify-between px-6'
            >
              <Box className='flex-row items-center'>
                <Icon name={vault.icon} color='accent' />
                <SelectItem
                  key={vault.id.value}
                  label={vault.title}
                  value={vault.id.value}
                  className='-translate-x-2'
                />
              </Box>

              <Icon name='check' color='accent' />
            </Pressable>
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}
