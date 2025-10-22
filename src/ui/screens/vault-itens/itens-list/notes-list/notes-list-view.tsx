import { FlatList } from 'react-native'
import { Link } from 'expo-router'

import type { Note } from '@/core/domain/entities'
import type { CryptoProvider } from '@/core/interfaces'

import { AppItem } from '@/ui/components/app-item'
import { NoteMenu } from '@/ui/components/note-menu'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

type Props = {
  notes: Note[]
  encryptionKey: string
  cryptoProvider: CryptoProvider
  onNoteDelete: () => void
}

export const NotesListView = ({
  notes,
  encryptionKey,
  cryptoProvider,
  onNoteDelete,
}: Props) => {
  return (
    <FlatList
      data={notes}
      ListEmptyComponent={
        <Text className='text-center text-neutral text-lg mt-12'>
          Nenhuma nota encontrada.
        </Text>
      }
      keyExtractor={(item) => item.id.value}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => {
        return (
          <AppItem.Container className='flex-row items-center justify-between'>
            <Link href={`/note/${item.id.value}`}>
              <Box className='flex-row items-center gap-3'>
                <AppItem.Icon
                  name='note'
                  backgroundColor='warningBackground'
                  foregroundColor='warning'
                />
                <AppItem.Info
                  name={item.title}
                  description={'********'}
                  className='w-[72%]'
                />
              </Box>
            </Link>

            <NoteMenu note={item} onDelete={onNoteDelete} />
          </AppItem.Container>
        )
      }}
    />
  )
}
