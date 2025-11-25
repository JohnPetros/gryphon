import z from 'zod'

import { DrizzleAccountsRepository } from '@/database/drizzle/repositories'
import { FetchAccountController } from '@/rest/controllers'
import { ExpoHttp } from '@/rest/expo/expo-http'
import { Route } from '@/rest/expo/route'

const schema = z.object({
  routeParams: z.object({
    accountId: z.string(),
  }),
})

type Schema = z.infer<typeof schema>

export const GET = Route(async (request, params) => {
  const http = await ExpoHttp<Schema>({
    schema,
    request,
    params,
  })
  const repository = DrizzleAccountsRepository()
  const controller = FetchAccountController(repository)
  const response = await controller.handle(http)
  return http.sendResponse(response)
})
