import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import type { CryptoProvider } from '@/core/interfaces'
import { Credential } from '@/core/domain/entities'

import { passwordSchema } from '@/validation'

const formSchema = z.object({
  title: z.string(),
  siteUrl: z.url(),
  login: z.string(),
  vauntId: z.string(),
  password: passwordSchema,
})

type FormSchema = z.infer<typeof formSchema>

type Params = {
  credential: Credential | null
  cryptoProvider: CryptoProvider
  encryptionKey: string
  onCreate: (credential: Credential) => Promise<void>
  onUpdate: (credential: Credential) => Promise<void>
}

export const useCredentialForm = ({
  credential,
  cryptoProvider,
  encryptionKey,
  onCreate,
  onUpdate,
}: Params) => {
  const encryptedData = credential?.encrypted.decrypt(encryptionKey, cryptoProvider)
  const { formState, control, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: credential?.title,
      siteUrl: credential?.siteUrl,
      login: encryptedData?.login,
      password: encryptedData?.password,
    },
  })

  async function handleFormSubmit(data: FormSchema) {
    const encryptedData = await cryptoProvider.encrypt(data, encryptionKey)

    const credential = Credential.create({
      title: data.title,
      siteUrl: data.siteUrl,
      vauntId: data.vauntId,
      encryptedData,
    })

    if (credential) {
      await onUpdate(credential)
      return
    }

    await onCreate(credential)
  }

  return {
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
