import type { RestClient } from '@/core/interfaces'
import type { DatabaseService as IDatabaseService } from '@/core/interfaces/services/database-service'
import type { DatabaseChanges } from '@/core/domain/types'
import type { Id } from '@/core/domain/structures'

export const DatabaseService = (restClient: RestClient): IDatabaseService => {
  return {
    async pullDatabaseChanges(accountId: Id, lastPulledAt?: Date) {
      restClient.setQueryParam('accountId', accountId.value)
      if (lastPulledAt)
        restClient.setQueryParam('lastPulledAt', lastPulledAt.toISOString())
      return await restClient.get('/database/synchronize')
    },

    async pushDatabaseChanges(changes: DatabaseChanges) {
      return await restClient.post('/database/synchronize', changes)
    },

    async resetDatabase(accountId: Id) {
      return await restClient.delete(`/database/${accountId.value}`)
    },
  }
}
