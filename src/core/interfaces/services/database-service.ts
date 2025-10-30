import type { DatabaseChanges } from '@/core/domain/types'
import type { RestResponse } from '@/core/responses'

export interface DatabaseService {
  pullDatabaseChanges(lastPulledAt: Date): Promise<RestResponse<DatabaseChanges>>
  pushDatabaseChanges(changes: DatabaseChanges): Promise<RestResponse>
}
