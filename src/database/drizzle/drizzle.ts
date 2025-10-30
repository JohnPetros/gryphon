import { config } from 'dotenv'
import { drizzle as drizzleLibsql } from 'drizzle-orm/libsql/web'
import { createClient } from '@libsql/client/web'

import { SERVER_ENV } from '@/constants/server-env'

config({ path: '.env' })

const client = createClient({
  url: SERVER_ENV.tursoDatabaseUrl,
  authToken: SERVER_ENV.tursoAuthToken,
})

export const drizzle = drizzleLibsql({
  client,
})
