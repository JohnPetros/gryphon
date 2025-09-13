import { FlatList } from 'react-native'
import { Link } from 'expo-router'

import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@/ui/gluestack/drawer'
import { Heading } from '@/ui/gluestack/heading'
import { Vault } from '@/core/domain/entities'
import { AppItem } from '@/ui/components/app-item'
import { Box } from '@/ui/gluestack/box'
import { Pressable } from '@/ui/components/pressable'

const mockData = [
  Vault.create({
    id: '1',
    title: 'Cofre 1',
    icon: 'vault',
  }),
  Vault.create({
    id: '2',
    title: 'Cofre 2',
    icon: 'vault',
  }),
  Vault.create({
    id: '3',
    title: 'Cofre 3',
    icon: 'vault',
  }),
]

type Props = {
  selectedVault: Vault | null
  isOpen: boolean
  vaults: Vault[]
  onClose: () => void
  onVaultSelect: (vault: Vault) => void
}

export const VaultsDrawerView = ({
  selectedVault,
  isOpen,
  vaults,
  onClose,
  onVaultSelect,
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
            data={mockData}
            keyExtractor={(item) => item.id.value}
            ItemSeparatorComponent={() => (
              <Box className='h-0.5 w-full bg-neutral-background my-3 rounded-md' />
            )}
            renderItem={({ item }) => (
              <Pressable onPress={() => onVaultSelect(item)}>
                <Box className='relative'>
                  <AppItem.Container className='flex-row gap-3'>
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
                  </AppItem.Container>
                  {selectedVault?.id.value === item.id.value && (
                    <Box className='absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full' />
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
