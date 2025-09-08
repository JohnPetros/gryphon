import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { vault } from '@/core/domain/entities'

const formSchema = z.object({
  title: z.string(),
  icon: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

type Params = {
  vault: vault | null
  onCreate: (vault: vault) => Promise<void>
  onUpdate: (vault: vault) => Promise<void>
}

export function usevaultForm({ vault, onCreate, onUpdate }: Params) {
  const { formState, control, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: vault?.title,
      icon: vault?.icon,
    },
  })

  async function handleFormSubmit(data: FormSchema) {
    if (vault) {
      await onUpdate(vault)
    } else {
      await onCreate(vault.create(data))
    }
  }

  return {
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
