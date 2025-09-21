import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect } from 'react'
import type { VaultDto } from '@/core/domain/entities/dtos'
import type { Vault } from '@/core/domain/entities'
import { VaultIcon } from '@/core/domain/structures/vault-icon'

const formSchema = z.object({
  title: z.string(),
  icon: z.string(),
})

type FormData = z.infer<typeof formSchema>

type Params = {
  vault: Vault | null
  onCreate: (vault: VaultDto) => Promise<void>
  onUpdate: (vault: VaultDto) => Promise<void>
}

export function useVaultForm({ vault, onCreate, onUpdate }: Params) {
  const { formState, control, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: vault?.title,
      icon: vault?.icon ?? 'entertainment',
    },
  })

  async function handleFormSubmit(data: FormData) {
    if (vault) {
      await onUpdate({
        ...data,
        icon: data.icon as VaultIcon,
      })
    } else {
      await onCreate({
        ...data,
        icon: data.icon as VaultIcon,
      })
    }
  }

  useEffect(() => {
    setValue('icon', vault?.icon ?? 'entertainment')
  }, [vault?.icon, setValue])

  return {
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
