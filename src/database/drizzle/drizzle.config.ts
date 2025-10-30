import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

import { SERVER_ENV } from '@/constants/server-env'

config({ path: '.env' })

export default defineConfig({
  schema: './src/database/drizzle/schemas/*',
  out: './src/database/drizzle/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: SERVER_ENV.tursoDatabaseUrl,
    authToken: SERVER_ENV.tursoAuthToken,
  },
})
