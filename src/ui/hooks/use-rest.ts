import { useMemo } from 'react'
import {
  AuthService,
  DatabaseService,
  HibpService,
  NotificationService,
} from '@/rest/services'
import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { CLIENT_ENV } from '@/constants'

const restClient = AxiosRestClient(`${CLIENT_ENV.gryphonBaseUrl}/api`)
const hibpRestClient = AxiosRestClient(CLIENT_ENV.hibpUrl)

export function useRest() {
  return useMemo(() => {
    return {
      authService: AuthService(restClient),
      databaseService: DatabaseService(restClient),
      hibpService: HibpService(hibpRestClient),
      notificationService: NotificationService(restClient),
    }
  }, [])
}
