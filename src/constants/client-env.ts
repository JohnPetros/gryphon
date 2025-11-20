import z from 'zod'

const clientEnv = {
  gryphonBaseUrl: process.env.EXPO_PUBLIC_GRYPHON_BASE_URL,
  kcvText: process.env.EXPO_PUBLIC_KCV_TEXT,
  onesignalAppId: process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID,
}

const clientEnvSchema = z.object({
  gryphonBaseUrl: z.url(),
  kcvText: z.string().min(1),
  onesignalAppId: z.string().min(1),
})

export const CLIENT_ENV = clientEnvSchema.parse(clientEnv)
