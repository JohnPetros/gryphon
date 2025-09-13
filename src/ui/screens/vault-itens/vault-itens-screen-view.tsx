import type { Vault } from '@/core/domain/entities'

import { Box } from '@/ui/gluestack/box'
import { Input } from '@/ui/components/input'
import { AppItem } from '@/ui/components/app-item'
import { Text } from '@/ui/gluestack/text'
import { Pressable } from '@/ui/components/pressable'
import { VaultsDrawer } from './vaults-drawer'
import { ScreenContainer } from '@/ui/components/screen-container'

type Props = {
  selectedVault: Vault | null
  vaults: Vault[]
  isDrawerOpen: boolean
  onDrawerOpen: () => void
  onDrawerClose: () => void
  onVaultSelect: (vault: Vault) => void
}

export function VaultItensScreenView({
  selectedVault,
  vaults,
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
  onVaultSelect,
}: Props) {
  return (
    <ScreenContainer>
      {selectedVault && (
        <Box className='flex-row gap-2 w-full'>
          <VaultsDrawer
            isOpen={isDrawerOpen}
            vaults={vaults}
            selectedVault={selectedVault}
            onClose={onDrawerClose}
            onVaultSelect={onVaultSelect}
          />

          <Pressable onPress={onDrawerOpen}>
            <AppItem.Container>
              <AppItem.Icon
                backgroundColor='infoBackground'
                foregroundColor='info'
                name={selectedVault.icon}
              />
            </AppItem.Container>
          </Pressable>
          <Input placeholder='pesquisar...' icon='search' className='h-16 flex-1' />
        </Box>
      )}

      <VaultsDrawer
        isOpen={isDrawerOpen}
        vaults={vaults}
        selectedVault={selectedVault}
        onVaultSelect={onVaultSelect}
        onClose={onDrawerClose}
      />

      {!selectedVault && (
        <Box className='flex-1 items-center justify-center'>
          <Text className='text-center text-neutral'>
            Crie um cofre para armazenar seus itens.
          </Text>
        </Box>
      )}
    </ScreenContainer>
  )
}
