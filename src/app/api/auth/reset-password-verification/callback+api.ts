import z from 'zod'

import { HandleResetPasswordVerificationCallbackController } from '@/rest/controllers'
import { ExpoHttp } from '@/rest/expo/expo-http'
import { Route } from '@/rest/expo/route'

const schema = z.object({
  queryParams: z.object({
    otp: z.string(),
  }),
})

type Schema = z.infer<typeof schema>

export const GET = Route(async (request, params) => {
  const http = await ExpoHttp<Schema>({
    schema,
    request,
    params,
  })
  const controller = HandleResetPasswordVerificationCallbackController()
  const response = await controller.handle(http)
  return http.sendResponse(response)
})
