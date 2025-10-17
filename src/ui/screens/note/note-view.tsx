import type { Note } from '@/core/domain/entities'

import { Textarea } from '@/ui/components/textarea'
import { PreviousScreenButton } from '@/ui/components/previous-screen-button'
import { ScreenContainer } from '@/ui/components/screen-container'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { NoteMenu } from '@/ui/components/note-menu'
import { VaultBadge } from './vault-badge'

type Props = {
  note: Note
  noteContent: string
  onNoteDelete: () => void
}

export const NoteView = ({ note, noteContent, onNoteDelete }: Props) => {
  return (
    <ScreenContainer>
      <Box className='mt-6 flex-row justify-between'>
        <PreviousScreenButton />
        <NoteMenu note={note} onDelete={onNoteDelete} />
      </Box>

      <Box className='flex-row items-center gap-3 mt-6'>
        <Box className='flex-1 gap-1'>
          <Text ellipsizeMode='tail' numberOfLines={1} className='text-2xl font-semibold'>
            {note.title}
          </Text>
          <VaultBadge vaultId={note.vaultId} />
        </Box>
      </Box>

      <Box className='gap-3 mt-6'>
        <Textarea
          label='Conteúdo'
          icon='content'
          value={noteContent}
          onChange={() => {}}
          isBlocked
        />
      </Box>
    </ScreenContainer>
  )
}
