import z from 'zod'

const serverEnv = {
  tursoDatabaseUrl: process.env.TURSO_DATABASE_URL,
  tursoAuthToken: process.env.TURSO_AUTH_TOKEN,
}

const serverEnvSchema = z.object({
  tursoDatabaseUrl: z.url(),
  tursoAuthToken: z.string(),
})

export const SERVER_ENV = serverEnvSchema.parse(serverEnv)
