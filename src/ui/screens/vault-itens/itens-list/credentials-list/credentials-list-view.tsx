import { FlatList } from 'react-native'
import { Link } from 'expo-router'

import type { Credential } from '@/core/domain/entities'
import type { CryptoProvider } from '@/core/interfaces'

import { AppItem } from '@/ui/components/app-item'
import { CredentialMenu } from '@/ui/components/credential-menu'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

type Props = {
  credentials: Credential[]
  encryptionKey: string
  cryptoProvider: CryptoProvider
  onCredentialDelete: () => void
}

export const CredentialsListView = ({
  credentials,
  encryptionKey,
  cryptoProvider,
  onCredentialDelete,
}: Props) => {
  return (
    <FlatList
      data={credentials}
      ListEmptyComponent={
        <Text className='text-center text-neutral text-lg mt-12'>
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
              </Box>
            </Link>

            <CredentialMenu credential={item} onDelete={onCredentialDelete} />
          </AppItem.Container>
        )
      }}
    />
  )
}
