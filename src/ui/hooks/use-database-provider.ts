import type { DatabaseProvider } from '@/core/interfaces/providers'

import { useDatabase } from './use-database'

export function useDatabaseProvider(): DatabaseProvider {
  const { synchronizeDatabase, applyChanges } = useDatabase()

  return {
    synchronizeDatabase,
    applyChanges,
  }
}
