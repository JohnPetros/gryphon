import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  email: z.email(),
})

type FormSchema = z.infer<typeof formSchema>

type Params = {
  sendPasswordResetEmail: (email: string) => Promise<void>
  onSendPasswordResetEmail: () => void
}

export function useEmailForm({
  sendPasswordResetEmail,
  onSendPasswordResetEmail,
}: Params) {
  const { formState, control, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function handleFormSubmit(data: FormSchema) {
    await sendPasswordResetEmail(data.email)
    onSendPasswordResetEmail()
  }

  return {
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
