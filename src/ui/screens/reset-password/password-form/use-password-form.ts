import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordSchema } from '@/validation'

const formSchema = z.object({
  password: passwordSchema,
})

type FormSchema = z.infer<typeof formSchema>

type Params = {
  otp: string
  resetPassword: (otp: string, password: string) => Promise<void>
  onPasswordReset: () => void
}

export function usePasswordForm({ otp, resetPassword, onPasswordReset }: Params) {
  const { formState, control, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function handleFormSubmit(data: FormSchema) {
    await resetPassword(otp, data.password)
    onPasswordReset()
  }

  return {
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
