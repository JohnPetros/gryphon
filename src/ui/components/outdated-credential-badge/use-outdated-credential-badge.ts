import { useEffect, useState } from 'react'

import type { CredentialVersionsRepository } from '@/core/interfaces'
import type { DateTimeProvider } from '@/core/interfaces/providers/datetime-provider'
import type { CredentialRotation, Id } from '@/core/domain/structures'

type Params = {
  credentialId: Id
  credentialRotation?: CredentialRotation
  credentialVersionsRepository: CredentialVersionsRepository
  datetimeProvider: DateTimeProvider
}

export const useOutdatedCredentialBadge = ({
  credentialId,
  credentialRotation,
  datetimeProvider,
  credentialVersionsRepository,
}: Params) => {
  const [isOutdated, setIsOutdated] = useState(false)

  useEffect(() => {
    async function checkIsOutdated() {
      if (!credentialRotation) return

      const lastVersion =
        await credentialVersionsRepository.findLastByCredential(credentialId)
      if (!lastVersion) return

      const isOutdated = lastVersion.isOutdated(credentialRotation, datetimeProvider)
      setIsOutdated(isOutdated)
    }
    checkIsOutdated()
  }, [])

  return {
    isOutdated,
  }
}
