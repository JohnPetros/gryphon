import z from 'zod'

const clientEnv = {
  gryphonBaseUrl: process.env.EXPO_PUBLIC_GRYPHON_BASE_URL,
}

const clientEnvSchema = z.object({
  gryphonBaseUrl: z.url(),
})

export const CLIENT_ENV = clientEnvSchema.parse(clientEnv)
