import type { RefObject } from 'react'
import { FlatList } from 'react-native'
import { Link } from 'expo-router'

import type { Credential } from '@/core/domain/entities'
import type { CryptoProvider } from '@/core/interfaces'

import type { BottomSheetRef } from '@/ui/components/bottom-sheet/types'
import { AppItem } from '@/ui/components/app-item'
import { CredentialMenu } from '@/ui/components/credential-menu'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { BottomSheet } from '@/ui/components/bottom-sheet'
import { Icon } from '@/ui/components/icon'
import { Checkbox } from '@/ui/components/checkbox'
import { OutdatedCredentialBadge } from '@/ui/components/outdated-credential-badge'

type Props = {
  bottomSheetRef: RefObject<BottomSheetRef | null>
  credentials: Credential[]
  encryptionKey: string
  cryptoProvider: CryptoProvider
  isOutdatedCredentialsFilterChecked: boolean
  onCredentialDelete: () => void
  onOutdatedCredentialsFilterChange: (isChecked: boolean) => void
}

export const CredentialsListView = ({
  bottomSheetRef,
  credentials,
  encryptionKey,
  cryptoProvider,
  isOutdatedCredentialsFilterChecked,
  onCredentialDelete,
  onOutdatedCredentialsFilterChange,
}: Props) => {
  return (
    <Box>
      <BottomSheet
        ref={bottomSheetRef}
        trigger={
          <Box className='items-center justify-center rounded-full border border-neutral-background w-10 h-10'>
            <Icon name='filter' color='neutral' size={18} />
          </Box>
        }
        snapPoints={['40%', '50%']}
        backgroundColor='background'
      >
        <Box className='p-6'>
          <Text className='text-xl text-neutral'>Filtrar credenciais</Text>
          <Box className='mt-6'>
            <Checkbox
              isChecked={isOutdatedCredentialsFilterChecked}
              onChange={onOutdatedCredentialsFilterChange}
            >
              Mostrar credenciais desatualizadas
            </Checkbox>
          </Box>
        </Box>
      </BottomSheet>
      <Box className='mt-6'>
        <FlatList
          data={credentials}
          ListEmptyComponent={
            <Text className='text-center text-neutral text-lg mt-6'>
              Nenhuma credencial encontrada.
            </Text>
          }
          keyExtractor={(item) => item.id.value}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => {
            const decryptedData = item.encrypted.decrypt(encryptionKey, cryptoProvider)
            return (
              <AppItem.Container className='flex-row items-center justify-between'>
                <Link href={`/credential/${item.id.value}`}>
                  <Box className='flex-row items-center gap-3'>
                    <AppItem.Icon
                      name='login'
                      backgroundColor='primaryBackground'
                      foregroundColor='primary'
                    />
                    <AppItem.Info
                      name={item.title}
                      description={decryptedData?.login ?? ''}
                      className='w-[72%]'
                    />
                    <Box className='absolute top-0 -right-12'>
                      <OutdatedCredentialBadge credential={item} />
                    </Box>
                  </Box>
                </Link>
                <CredentialMenu credential={item} onDelete={onCredentialDelete} />
              </AppItem.Container>
            )
          }}
        />
      </Box>
    </Box>
  )
}
