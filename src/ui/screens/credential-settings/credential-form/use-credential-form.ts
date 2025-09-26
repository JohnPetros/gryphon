import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import type { CryptoProvider } from '@/core/interfaces'
import { Credential } from '@/core/domain/entities'

import { useEffect } from 'react'
import { Password } from '@/core/domain/structures'
import { useToast } from '@/ui/hooks/use-toast'

const PASSWORD_STRENGTH_MESSAGES: Record<number, string> = {
  1: 'muito fraca',
  2: 'fraca',
  3: 'boa',
  4: 'forte',
  5: 'muito forte',
}

const formSchema = z.object({
  title: z.string().min(1),
  siteUrl: z.url().optional(),
  login: z.string().min(1),
  vaultId: z.string().min(1),
  password: z.string().min(1),
})

type FormSchema = z.infer<typeof formSchema>

type Params = {
  credential: Credential | null
  cryptoProvider: CryptoProvider
  encryptionKey: string
  minimumPasswordStrength: number
  onCreate: (credential: Credential) => Promise<void>
  onUpdate: (credential: Credential) => Promise<void>
}

export const useCredentialForm = ({
  credential,
  cryptoProvider,
  encryptionKey,
  minimumPasswordStrength,
  onCreate,
  onUpdate,
}: Params) => {
  const { formState, control, watch, handleSubmit, setValue, setError } =
    useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: credential?.title,
        siteUrl: credential?.siteUrl ?? undefined,
        vaultId: credential?.vaultId.value ?? undefined,
      },
    })
  const toast = useToast()

  async function handleFormSubmit(data: FormSchema) {
    if (Password.create(data.password).strength < minimumPasswordStrength) {
      toast.show(
        `Senha deve ser pelo menos ${PASSWORD_STRENGTH_MESSAGES[minimumPasswordStrength]}`,
        'error',
      )
      return
    }

    const encryptedData = await cryptoProvider.encrypt(
      {
        login: data.login,
        password: data.password,
      },
      encryptionKey,
    )

    if (credential) {
      const updatedCredential = Credential.create({
        id: credential.id.value,
        title: data.title,
        siteUrl: data.siteUrl,
        vaultId: data.vaultId,
        encryptedData,
      })
      await onUpdate(updatedCredential)
      return
    }

    const newCredential = Credential.create({
      title: data.title,
      siteUrl: data.siteUrl,
      vaultId: data.vaultId,
      encryptedData,
    })

    await onCreate(newCredential)
  }

  const passwordWatch = watch('password')

  useEffect(() => {
    if (
      passwordWatch &&
      Password.create(passwordWatch).strength < minimumPasswordStrength
    ) {
      setError('password', {
        message: PASSWORD_STRENGTH_MESSAGES[minimumPasswordStrength],
      })
    }
  }, [passwordWatch])

  useEffect(() => {
    if (!credential) return

    setValue('title', credential.title)
    setValue('vaultId', credential.vaultId.value)
    if (credential.siteUrl) setValue('siteUrl', credential.siteUrl)

    const decryptedData = credential?.encrypted.decrypt(encryptionKey, cryptoProvider)
    if (decryptedData) {
      setValue('login', decryptedData?.login)
      setValue('password', decryptedData?.password)
    }
  }, [credential, encryptionKey, cryptoProvider, setValue])
  
  console.log('credential.vaultId.value', credential?.vaultId.value)

  return {
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
