import type { Vault } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'

import { Box } from '@/ui/gluestack/box'
import { Input } from '@/ui/components/input'
import { AppItem } from '@/ui/components/app-item'
import { Text } from '@/ui/gluestack/text'
import { Pressable } from '@/ui/components/pressable'
import { ScreenContainer } from '@/ui/components/screen-container'
import { VaultsDrawer } from './vaults-drawer'
import { ItensList } from './itens-list'
import { ScreenTitle } from '@/ui/components/screen-title'

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
        <Box className='flex flex-col gap-3 w-full'>
          <ScreenTitle>{selectedVault.title}</ScreenTitle>

          <Box className='flex-row gap-2'>
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

      <Box className='flex-1 mt-6'>
        {selectedVault && <ItensList vaultId={selectedVault.id} />}
      </Box>
    </ScreenContainer>
  )
}
