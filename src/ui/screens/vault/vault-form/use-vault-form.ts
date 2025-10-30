import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect } from 'react'
import type { VaultDto } from '@/core/domain/entities/dtos'
import type { Vault } from '@/core/domain/entities'
import type { VaultIcon } from '@/core/domain/structures/vault-icon'
import type { Id } from '@/core/domain/structures'

const formSchema = z.object({
  title: z.string().min(1),
  icon: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

type Params = {
  accountId: Id
  vault: Vault | null
  onCreate: (vault: VaultDto) => Promise<void>
  onUpdate: (vault: VaultDto) => Promise<void>
}

export function useVaultForm({ vault, accountId, onCreate, onUpdate }: Params) {
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
        accountId: accountId.value,
        icon: data.icon as VaultIcon,
      })
    } else {
      await onCreate({
        ...data,
        accountId: accountId.value,
        icon: data.icon as VaultIcon,
      })
    }
  }

  useEffect(() => {
    setValue('title', vault?.title ?? '')
    setValue('icon', vault?.icon ?? 'entertainment')
  }, [vault?.icon, vault?.title, setValue])

  return {
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
