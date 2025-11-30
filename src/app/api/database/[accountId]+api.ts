import { z } from 'zod'

import { ExpoHttp } from '@/rest/expo/expo-http'
import { Route } from '@/rest/expo/route'
import { ResetDatabaseController } from '@/rest/controllers'
import { DrizzleAccountsRepository } from '@/database/drizzle/repositories'

const schema = z.object({
  routeParams: z.object({
    accountId: z.string(),
  }),
})

type Schema = z.infer<typeof schema>

export const DELETE = Route(async (request, params) => {
  const http = await ExpoHttp<Schema>({
    schema,
    request,
    params,
  })
  const accountsRepository = DrizzleAccountsRepository()
  const controller = ResetDatabaseController({
    accountsRepository,
  })
  const response = await controller.handle(http)
  return http.sendResponse(response)
})
