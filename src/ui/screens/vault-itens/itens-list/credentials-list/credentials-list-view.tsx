import type { Credential } from '@/core/domain/entities'
import { AppItem } from '@/ui/components/app-item'
import { Pressable } from '@/ui/components/pressable'
import { Text } from '@/ui/gluestack/text'
import { Link } from 'expo-router'
import { FlatList } from 'react-native'

type Props = {
  credentials: Credential[]
}

export const CredentialsListView = ({ credentials }: Props) => {
  console.log(credentials)
  return (
    <FlatList
      data={credentials}
      ListEmptyComponent={
        <Text className='text-center text-neutral text-lg mt-12'>
          Nenhum credencial encontrada.
        </Text>
      }
      keyExtractor={(item) => item.id.value}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => (
        <Link href={`/credential/${item.id.value}`}>
          <AppItem.Container className='w-full flex-row items-center gap-3'>
            <AppItem.Icon
              name='login'
              backgroundColor='primaryBackground'
              foregroundColor='primary'
            />
            <AppItem.Info name={item.title} description={item.siteUrl ?? ''} />
          </AppItem.Container>
        </Link>
      )}
    />
  )
}
