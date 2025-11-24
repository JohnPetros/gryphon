import type { RestClient } from '@/core/interfaces'
import type { HibpService as IHibpService } from '@/core/interfaces/services'
import { RestResponse } from '@/core/responses'

export const HibpService = (restClient: RestClient): IHibpService => {
  return {
    async getPasswords(passwordHashPrefix: string) {
      const response = await restClient.get<string>(
        `/${passwordHashPrefix.toUpperCase()}`,
      )
      if (response.isFailure) {
        return new RestResponse({
          body: [],
          errorMessage: response.errorMessage,
          statusCode: response.statusCode,
        })
      }
      return new RestResponse({ body: response.body.split('\n') })
    },
  }
}
