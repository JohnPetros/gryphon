import { use } from 'react'

import { ROUTES } from '@/constants'
import type { Credential } from '@/core/domain/entities'
import type { Id } from '@/core/domain/structures'
import type { CredentialsRepository } from '@/core/interfaces'
import { useNavigation } from '@/ui/hooks/use-navigation'
import { Alert } from 'react-native'

export function useCredentialScreen(
  credentialsRepository: CredentialsRepository,
  credentialId?: Id,
) {
  const { navigate } = useNavigation()

  const credential = use(
    credentialId ? credentialsRepository.findById(credentialId) : Promise.resolve(null),
  )

  async function handleCredentialCreate(credential: Credential) {
    try {
      Alert.alert('Credencial criada com sucesso')
      await credentialsRepository.add(credential)
      console.log(await credentialsRepository.findById(credential.id))
    } catch (error) {
      console.error(error)
    }
    // navigate(ROUTES.vaultItens)
  }

  async function handleCredentialUpdate(credential: Credential) {
    // await credentialsRepository.update(credential)
    // navigate(ROUTES.vaultItens)
  }

  return {
    credential,
    handleCredentialCreate,
    handleCredentialUpdate,
  }
}
