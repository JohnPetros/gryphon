import z from 'zod'

const serverEnv = {
  tursoConnectionUrl: process.env.TURSO_CONNECTION_URL,
  tursoAuthToken: process.env.TURSO_AUTH_TOKEN,
}

const serverEnvSchema = z.object({
  tursoConnectionUrl: z.url(),
  tursoAuthToken: z.string(),
})

export const SERVER_ENV = serverEnvSchema.parse(serverEnv)
