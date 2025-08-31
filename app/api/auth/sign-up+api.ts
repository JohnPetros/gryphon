import { SignUpController } from '@/rest/controllers/auth/sign-up-controller'
import { ExpoHttp } from '@/rest/expo/expo-http'
import { Route } from '@/rest/expo/route'

export const GET = Route(async () => {
  const http = ExpoHttp()
  const controller = SignUpController()
  const response = await controller.handle(http)
  return http.sendResponse(response)
})
