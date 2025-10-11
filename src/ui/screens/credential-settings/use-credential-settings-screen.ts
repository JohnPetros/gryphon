import { useEffect, useState } from 'react'

import type {
  CredentialsRepository,
  CredentialVersionsRepository,
} from '@/core/interfaces'
import type { Credential } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'

import { ROUTES } from '@/constants'
import { useNavigation } from '@/ui/hooks/use-navigation'

type Params = {
  credentialsRepository: CredentialsRepository
  credentialVersionsRepository: CredentialVersionsRepository
  credentialId?: Id
  onChangeDatabase: () => Promise<void>
}

export function useCredentialSettingsScreen({
  credentialsRepository,
  credentialVersionsRepository,
  credentialId,
  onChangeDatabase,
}: Params) {
  const [credential, setCredential] = useState<Credential | null>(null)
  const { navigate } = useNavigation()

  async function handleCredentialCreate(credential: Credential) {
    await credentialsRepository.add(credential)
    navigate(ROUTES.vaultItens, { vaultId: credential.vaultId.value })
    console.log('handleCredentialCreate')

    try {
      await onChangeDatabase()
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCredentialUpdate(updatedCredential: Credential) {
    try {
      if (!credential) return

      const lastVersion = await credentialVersionsRepository.findLastByCredential(
        updatedCredential.id,
      )
      const nextVersion = credential.createVersion(lastVersion?.versionNumber)
      await credentialVersionsRepository.add(nextVersion)

      await credentialsRepository.update(updatedCredential)
      navigate(ROUTES.vaultItens, { vaultId: updatedCredential.vaultId.value })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    async function loadCredential() {
      if (credentialId) {
        const credential = await credentialsRepository.findById(credentialId)
        setCredential(credential)
      }
    }
    loadCredential()
  }, [])

  return {
    credential,
    handleCredentialCreate,
    handleCredentialUpdate,
  }
}
