import { config } from 'dotenv'
import { drizzle as drizzleLibsql } from 'drizzle-orm/libsql'

import { SERVER_ENV } from '@/constants/server-env'

config({ path: '.env' })

export const drizzle = drizzleLibsql({
  connection: {
    url: SERVER_ENV.tursoConnectionUrl,
    authToken: SERVER_ENV.tursoAuthToken,
  },
})
