import z from 'zod'

const serverEnv = {
  tursoDatabaseUrl: process.env.TURSO_DATABASE_URL,
  tursoAuthToken: process.env.TURSO_AUTH_TOKEN,
  oneSignalApiKey: process.env.ONE_SIGNAL_API_KEY,
}

const serverEnvSchema = z.object({
  tursoDatabaseUrl: z.url(),
  tursoAuthToken: z.string().min(1),
  oneSignalApiKey: z.string().min(1),
})

export const SERVER_ENV = serverEnvSchema.parse(serverEnv)
