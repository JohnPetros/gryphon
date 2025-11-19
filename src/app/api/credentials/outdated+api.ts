import { ExpoHttp } from '@/rest/expo/expo-http'
import { Route } from 'expo-router/build/Route'
import { VerifyOutdatedCredentialsController } from '@/rest/controllers/verify-outdated-credentials-controller'
import {
  DrizzleAccountsRepository,
  DrizzleCredentialsRepository,
  DrizzleCredentialVersionsRepository,
} from '@/database/drizzle/repositories'
import { NotificationService } from '@/rest/services/notification-service'

export const GET = Route(async () => {
  const http = await ExpoHttp()
  const accountsRepository = DrizzleAccountsRepository()
  const credentialsRepository = DrizzleCredentialsRepository()
  const credentialVersionsRepository = DrizzleCredentialVersionsRepository()
  const notificationService = NotificationService()
  const controller = VerifyOutdatedCredentialsController({
    accountsRepository,
    credentialsRepository,
    credentialVersionsRepository,
    notificationService,
    datetimeProvider: {} as any,
  })
  const response = await controller.handle(http)
  return http.sendResponse(response)
})
