import z from 'zod'

import { ExpoHttp } from '@/rest/expo/expo-http'
import { Route } from '@/rest/expo/route'
import { SendNotificationController } from '@/rest/controllers/send-notification-controller'
import { OneSignalNotificationService } from '@/rest/services/one-signal-notification-service'

const schema = z.object({
  routeParams: z.object({
    accountId: z.string(),
  }),
  body: z.object({
    title: z.string(),
    message: z.string(),
    route: z.string(),
  }),
})

type Schema = z.infer<typeof schema>

export const POST = Route(async (request, params) => {
  const http = await ExpoHttp<Schema>({
    schema,
    request,
    params,
  })
  const service = OneSignalNotificationService()
  const controller = SendNotificationController(service)
  const response = await controller.handle(http)
  return http.sendResponse(response)
})
