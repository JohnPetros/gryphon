import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Vault } from '@/core/domain/entities'

const formSchema = z.object({
  title: z.string(),
  icon: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

type Params = {
  vault: Vault | null
  onCreate: (vault: Vault) => Promise<void>
  onUpdate: (vault: Vault) => Promise<void>
}

export function useVaultForm({ vault, onCreate, onUpdate }: Params) {
  const { formState, control, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: vault?.title,
      icon: vault?.icon,
    },
  })

  async function handleFormSubmit(data: FormSchema) {
    if (vault) {
      await onUpdate(Vault.create(data))
    } else {
      await onCreate(Vault.create(data))
    }
  }

  return {
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
