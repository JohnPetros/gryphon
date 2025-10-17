import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import type { CryptoProvider } from '@/core/interfaces'
import { Note } from '@/core/domain/entities'

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  vaultId: z.string().min(1),
})

type FormSchema = z.infer<typeof formSchema>

type Params = {
  note: Note | null
  cryptoProvider: CryptoProvider
  encryptionKey: string
  onCreate: (note: Note) => Promise<void>
  onUpdate: (note: Note) => Promise<void>
}

export const useNoteForm = ({
  note,
  cryptoProvider,
  encryptionKey,
  onCreate,
  onUpdate,
}: Params) => {
  const { formState, control, handleSubmit, setValue } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note?.title,
      vaultId: note?.vaultId.value ?? undefined,
    },
  })

  async function handleFormSubmit(data: FormSchema) {
    const encryptedData = await cryptoProvider.encrypt(
      {
        content: data.content,
      },
      encryptionKey,
    )

    if (note) {
      const updatedNote = Note.create({
        id: note.id.value,
        title: data.title,
        vaultId: data.vaultId,
        encryptedData,
      })
      await onUpdate(updatedNote)
      return
    }

    const newNote = Note.create({
      title: data.title,
      vaultId: data.vaultId,
      encryptedData,
    })

    await onCreate(newNote)
  }

  useEffect(() => {
    if (!note) return

    setValue('title', note.title)
    setValue('vaultId', note.vaultId.value)

    const decryptedData = note?.encrypted.decrypt(encryptionKey, cryptoProvider)
    if (decryptedData) {
      setValue('content', decryptedData?.content)
    }
  }, [note, encryptionKey, cryptoProvider, setValue])

  return {
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
