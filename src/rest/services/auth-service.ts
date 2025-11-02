import type { RestClient } from '@/core/interfaces'
import type { AuthService as IAuthService } from '@/core/interfaces/services/auth-service'
import type { Id } from '@/core/domain/structures'

export const AuthService = (restClient: RestClient): IAuthService => {
  return {
    async fetchAccount(accountId: Id) {
      return await restClient.get(`/auth/${accountId.value}`)
    },
  }
}
