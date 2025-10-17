import { KeyboardAvoidingView, ScrollView } from 'react-native'

import type { Note } from '@/core/domain/entities'

import { ScreenContainer } from '@/ui/components/screen-container'
import { ScreenTitle } from '@/ui/components/screen-title'
import { Box } from '@/ui/gluestack/box'
import { PreviousScreenButton } from '@/ui/components/previous-screen-button'
import { NoteForm } from './note-form'

type Props = {
  note: Note | null
  onCreate: (note: Note) => Promise<void>
  onUpdate: (note: Note) => Promise<void>
}

export const NoteSettingsScreenView = ({ note, onCreate, onUpdate }: Props) => {
  return (
    <ScreenContainer>
      <PreviousScreenButton />

      <Box className='mt-6'>
        <ScreenTitle>{note ? 'Editar Nota' : 'Adicionar Nota'}</ScreenTitle>

        <KeyboardAvoidingView>
          <ScrollView className='mt-6' contentContainerStyle={{ height: 1200 }}>
            <NoteForm note={note} onCreate={onCreate} onUpdate={onUpdate} />
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </ScreenContainer>
  )
}
