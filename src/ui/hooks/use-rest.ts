import { useMemo } from 'react'
import { AuthService, DatabaseService } from '@/rest/services'
import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { CLIENT_ENV } from '@/constants'

const restClient = AxiosRestClient(`${CLIENT_ENV.gryphonBaseUrl}/api`)

export function useRest() {
  return useMemo(() => {
    return {
      authService: AuthService(restClient),
      databaseService: DatabaseService(restClient),
    }
  }, [])
}
