import { useEffect, useState } from 'react'

import type { CredentialsRepository } from '@/core/interfaces'
import { Credential } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'

import { ROUTES } from '@/constants'
import { useNavigation } from '@/ui/hooks/use-navigation'

export function useCredentialSettingsScreen(
  credentialsRepository: CredentialsRepository,
  credentialId?: Id,
) {
  const [credential, setCredential] = useState<Credential | null>(null)
  const { navigate } = useNavigation()

  async function handleCredentialCreate(credential: Credential) {
    await credentialsRepository.add(credential)
    navigate(ROUTES.vaultItens, { vaultId: credential.vaultId.value })
  }

  async function handleCredentialUpdate(credential: Credential) {
    try {
      await credentialsRepository.update(credential)
      navigate(ROUTES.vaultItens, { vaultId: credential.vaultId.value })
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
