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
    const firstVersion = credential.createVersion(0)
    await credentialsRepository.add(credential)
    await credentialVersionsRepository.add(firstVersion)
    try {
      await onChangeDatabase()
    } catch {}
    navigate(ROUTES.vaultItens, {
      vaultId: credential.vaultId.value,
      activeTab: 'credential',
    })
  }

  async function handleCredentialUpdate(updatedCredential: Credential) {
    try {
      if (!credential) return

      const lastVersion = await credentialVersionsRepository.findLastByCredential(
        updatedCredential.id,
      )
      const nextVersion = updatedCredential.createVersion(lastVersion?.versionNumber)
      await credentialVersionsRepository.add(nextVersion)
      console.log(updatedCredential.updatedAt)
      await credentialsRepository.update(updatedCredential)
      try {
        await onChangeDatabase()
      } catch {}
      navigate(ROUTES.vaultItens, {
        vaultId: credential.vaultId.value,
        activeTab: 'credential',
      })
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
