import { FlatList } from 'react-native'

import type { Id } from '@/core/domain/structures'
import type { Vault } from '@/core/domain/entities'

import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
} from '@/ui/gluestack/drawer'
import { Heading } from '@/ui/gluestack/heading'
import { AppItem } from '@/ui/components/app-item'
import { Box } from '@/ui/gluestack/box'
import { Pressable } from '@/ui/components/pressable'

type Props = {
  selectedVault: Vault | null
  isOpen: boolean
  vaults: Vault[]
  onClose: () => void
  onVaultSelect: (vault: Vault) => void
  onVaultEdit: (vaultId: Id) => void
  onVaultDelete: (vaultId: Id) => void
}

export const VaultsDrawerView = ({
  selectedVault,
  isOpen,
  vaults,
  onClose,
  onVaultSelect,
  onVaultEdit,
  onVaultDelete,
}: Props) => {
  return (
    <Drawer isOpen={isOpen} size='sm' anchor='left' onClose={onClose}>
      <DrawerBackdrop className='bg-black' />
      <DrawerContent className='flex-1 bg-background pt-16 w-64'>
        <DrawerHeader>
          <Heading size='2xl' className='text-accent font-bold'>
            Cofres
          </Heading>
        </DrawerHeader>
        <Box className='flex-1 mt-6'>
          <FlatList
            data={vaults}
            keyExtractor={(item) => item.id.value}
            ItemSeparatorComponent={() => (
              <Box className='h-0.5 w-full bg-neutral-background my-3 rounded-md' />
            )}
            renderItem={({ item }) => (
              <Pressable onPress={() => onVaultSelect(item)}>
                <Box className='relative'>
                  <AppItem.Container className='flex-row justify-between'>
                    <Box className='flex-row gap-2'>
                      <AppItem.Icon
                        backgroundColor='infoBackground'
                        foregroundColor='info'
                        name={item.icon}
                        className='w-12 h-12'
                      />
                      <AppItem.Info
                        name={item.title}
                        description={`${item.itemCount} itens`}
                      />
                    </Box>
                    <AppItem.Menu>
                      {(close) => (
                        <>
                          <AppItem.MenuOption
                            color='neutral'
                            icon='edit'
                            onPress={() => {
                              onVaultEdit(item.id)
                              close()
                            }}
                          >
                            Editar
                          </AppItem.MenuOption>
                          <AppItem.MenuOption
                            color='danger'
                            icon='trash'
                            onPress={() => {
                              onVaultDelete(item.id)
                              close()
                            }}
                          >
                            Excluir
                          </AppItem.MenuOption>
                        </>
                      )}
                    </AppItem.Menu>
                  </AppItem.Container>
                  {selectedVault?.id.value === item.id.value && (
                    <Box className='absolute top-0 right-1 w-2 h-2 bg-green-500 rounded-full' />
                  )}
                </Box>
              </Pressable>
            )}
          />
        </Box>
      </DrawerContent>
    </Drawer>
  )
}
