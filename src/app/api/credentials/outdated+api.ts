import { ExpoHttp } from '@/rest/expo/expo-http'
import { VerifyOutdatedCredentialsController } from '@/rest/controllers/verify-outdated-credentials-controller'
import {
  DrizzleAccountsRepository,
  DrizzleCredentialsRepository,
  DrizzleCredentialVersionsRepository,
} from '@/database/drizzle/repositories'
import { OneSignalNotificationService } from '@/rest/services/one-signal-notification-service'
import { DayjsDateTimeProvider } from '@/provision/datetime-provider'
import { Route } from '@/rest/expo/route'

export const POST = Route(async () => {
  const http = await ExpoHttp()
  const accountsRepository = DrizzleAccountsRepository()
  const credentialsRepository = DrizzleCredentialsRepository()
  const credentialVersionsRepository = DrizzleCredentialVersionsRepository()
  const notificationService = OneSignalNotificationService()
  const datetimeProvider = DayjsDateTimeProvider()
  const controller = VerifyOutdatedCredentialsController({
    accountsRepository,
    credentialsRepository,
    credentialVersionsRepository,
    notificationService,
    datetimeProvider,
  })
  const response = await controller.handle(http)
  return http.sendResponse(response)
})
