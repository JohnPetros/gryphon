import z from 'zod'

const clientEnv = {
  gryphonBaseUrl: process.env.EXPO_PUBLIC_GRYPHON_BASE_URL,
  kcvText: process.env.EXPO_PUBLIC_KCV_TEXT,
  oneSignalAppId: process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID,
  hibpUrl: process.env.EXPO_PUBLIC_HIBP_URL,
}

const clientEnvSchema = z.object({
  gryphonBaseUrl: z.url(),
  hibpUrl: z.url(),
  kcvText: z.string().min(1),
  oneSignalAppId: z.string().min(1),
})

export const CLIENT_ENV = clientEnvSchema.parse(clientEnv)
