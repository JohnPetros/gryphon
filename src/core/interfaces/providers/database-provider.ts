import type { DatabaseChanges } from '@/core/domain/types'

export interface DatabaseProvider {
  synchronizeDatabase: () => Promise<void>
  applyChanges: (changes: DatabaseChanges, isSynced: boolean) => Promise<void>
}
