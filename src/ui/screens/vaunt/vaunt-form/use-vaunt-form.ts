import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Vaunt } from '@/core/domain/entities'

const formSchema = z.object({
  title: z.string(),
  icon: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

type Params = {
  vaunt: Vaunt | null
  onCreate: (vaunt: Vaunt) => Promise<void>
  onUpdate: (vaunt: Vaunt) => Promise<void>
}

export function useVauntForm({ vaunt, onCreate, onUpdate }: Params) {
  const { formState, control, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: vaunt?.title,
      icon: vaunt?.icon,
    },
  })

  async function handleFormSubmit(data: FormSchema) {
    if (vaunt) {
      await onUpdate(vaunt)
    } else {
      await onCreate(Vaunt.create(data))
    }
  }

  return {
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
