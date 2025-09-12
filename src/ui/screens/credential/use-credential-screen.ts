import type { Credential } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { CredentialsRepository } from '@/core/interfaces'
import { use } from 'react'

export function useCredentialScreen(
  credentialsRepository: CredentialsRepository,
  credentialId?: Id,
) {
  const credential = use(
    credentialId ? credentialsRepository.findById(credentialId) : Promise.resolve(null),
  )

  async function handleCredentialCreate(credential: Credential) {
    await credentialsRepository.add(credential)
  }

  async function handleCredentialUpdate(credential: Credential) {
    await credentialsRepository.update(credential)
  }

  return {
    credential,
    handleCredentialCreate,
    handleCredentialUpdate,
  }
}
