import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'

import { Box } from '@/ui/gluestack/box'
import { Input } from '@/ui/components/input'
import { AppItem } from '@/ui/components/app-item'
import { Text } from '@/ui/gluestack/text'
import { Pressable } from '@/ui/components/pressable'
import { ScreenContainer } from '@/ui/components/screen-container'
import { VaultsDrawer } from './vaults-drawer'

type Props = {
  selectedVault: Vault | null
  vaults: Vault[]
  isDrawerOpen: boolean
  onDrawerOpen: () => void
  onDrawerClose: () => void
  onVaultSelect: (vault: Vault) => void
  onVaultEdit: (vaultId: Id) => void
  onVaultDelete: (vaultId: Id) => void
}

export function VaultItensScreenView({
  selectedVault,
  vaults,
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
  onVaultSelect,
  onVaultEdit,
  onVaultDelete,
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
            onVaultEdit={onVaultEdit}
            onVaultDelete={onVaultDelete}
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
        onVaultEdit={onVaultEdit}
        onVaultDelete={onVaultDelete}
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
