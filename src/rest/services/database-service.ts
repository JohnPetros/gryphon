import type { RestClient } from '@/core/interfaces'
import type { DatabaseService as IDatabaseService } from '@/core/interfaces/services/database-service'
import type { DatabaseChanges } from '@/core/domain/types'

export const DatabaseService = (restClient: RestClient): IDatabaseService => {
  return {
    async pullDatabaseChanges(lastPulledAt: Date) {
      restClient.setQueryParam('lastPulledAt', lastPulledAt.toISOString())
      return await restClient.get('/database/synchronize')
    },

    async pushDatabaseChanges(changes: DatabaseChanges) {
      return await restClient.post('/database/synchronize', changes)
    },
  }
}
