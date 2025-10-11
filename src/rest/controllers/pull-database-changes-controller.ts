import type { Controller } from '@/core/interfaces/controller'
import type { Http } from '@/core/interfaces/http'

type Schema = {
  queryParams: {
    lastPulledAt: Date
  }
}

export const PullDatabaseChangesController = (): Controller<Schema> => {
  return {
    async handle(http: Http<Schema>) {
      const { lastPulledAt } = http.getQueryParams()
      console.log(lastPulledAt)
      return http.send({
        createdCredentials: [],
        updatedCredentials: [],
        deletedCredentialsIds: [],
      })
    },
  }
}
