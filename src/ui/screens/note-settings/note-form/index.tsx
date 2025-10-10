import type { Note } from '@/core/domain/entities'

import { NoteFormView } from './note-form-view'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

type Props = {
  note: Note | null
  onCreate: (note: Note) => Promise<void>
  onUpdate: (note: Note) => Promise<void>
}

export const NoteForm = ({ note, onCreate, onUpdate }: Props) => {
  const cryptoProvider = useCryptoProvider()
  const { encryptionKey } = useAuthContext()

  return (
    <NoteFormView
      note={note}
      cryptoProvider={cryptoProvider}
      encryptionKey={encryptionKey}
      onCreate={onCreate}
      onUpdate={onUpdate}
    />
  )
}
