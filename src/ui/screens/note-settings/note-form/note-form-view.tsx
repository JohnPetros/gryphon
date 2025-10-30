import { Controller } from 'react-hook-form'
import { KeyboardAvoidingView } from 'react-native'

import type { CryptoProvider } from '@/core/interfaces'
import type { Note } from '@/core/domain/entities'

import { Box } from '@/ui/gluestack/box'
import { Input } from '@/ui/components/input'
import { Button } from '@/ui/components/button'
import { VaultSelect } from '@/ui/components/vault-select'
import { Textarea } from '@/ui/components/textarea'
import { useNoteForm } from './use-note-form'

type Params = {
  note: Note | null
  cryptoProvider: CryptoProvider
  encryptionKey: string
  onCreate: (note: Note) => Promise<void>
  onUpdate: (note: Note) => Promise<void>
}

export const NoteFormView = ({
  note,
  cryptoProvider,
  encryptionKey,
  onCreate,
  onUpdate,
}: Params) => {
  const { isSubmitting, isValid, control, handleSubmit } = useNoteForm({
    note,
    cryptoProvider,
    encryptionKey,
    onCreate,
    onUpdate,
  })

  return (
    <Box className='flex flex-col gap-2'>
      <Box className='flex flex-row gap-2'>
        <Controller
          control={control}
          name='vaultId'
          render={({ field }) => {
            return (
              <VaultSelect
                defaultValue={note?.vaultId.value ?? ''}
                onChange={field.onChange}
              />
            )
          }}
        />

        <Button
          onPress={handleSubmit}
          className='w-32 items-center justify-center'
          isDisabled={!isValid}
          isLoading={isSubmitting}
        >
          {note ? 'Editar' : 'Criar'}
        </Button>
      </Box>
      <KeyboardAvoidingView>
        <Box className='gap-3 mt-6'>
          <Controller
            control={control}
            name='title'
            render={({ field }) => (
              <Input
                label='Título'
                icon='title'
                placeholder='Sem título'
                defaultValue={field.value}
                isRequired
                hasCapitalize
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name='content'
            render={({ field }) => (
              <Textarea
                label='Conteúdo'
                icon='content'
                placeholder='Minha nota de exemplo'
                defaultValue={field.value}
                isRequired
                onChange={field.onChange}
              />
            )}
          />
        </Box>
      </KeyboardAvoidingView>
    </Box>
  )
}
