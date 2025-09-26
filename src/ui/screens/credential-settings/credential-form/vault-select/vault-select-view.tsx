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
import { mergeClassNames } from '@/ui/utils'
import { Alert } from 'react-native'

type Props = {
  vaults: Vault[]
  selectedVault: Vault | null
  onChange: (vaultId: string) => void
}

export const VaultSelectView = ({ vaults, selectedVault, onChange }: Props) => {
  const isEmpty = vaults.length === 0
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        className={mergeClassNames(
          'w-48 h-16 bg-info-background justify-between px-4 border-none',
          isEmpty ? 'text-sm text-accent opacity-50' : 'text-lg text-accent',
        )}
      >
        {isEmpty ? (
          <Text className='text-sm text-accent'>Nenhum cofre cadastrado</Text>
        ) : (
          <Text className='text-lg text-accent'>{selectedVault?.title}</Text>
        )}
        {!isEmpty && <Icon name='arrow-down' color='accent' />}
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop className='bg-black' />
        <SelectContent className='items-start px-6 py-4 min-h-64 bg-black'>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator className='bg-accent' />
          </SelectDragIndicatorWrapper>
          {vaults.map((vault) => (
            <Pressable
              key={vault.id.value}
              onPress={() => Alert.alert('teste')}
              className='flex-row items-center justify-between'
            >
              <Box className='flex-1 flex-row items-center'>
                <Icon name={vault.icon} color='accent' />
                <SelectItem
                  key={vault.id.value}
                  label={vault.title}
                  value={vault.id.value}
                  className='-translate-x-2'
                />
              </Box>

              {selectedVault?.id.value === vault.id.value && (
                <Icon name='check' color='accent' />
              )}
            </Pressable>
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}
