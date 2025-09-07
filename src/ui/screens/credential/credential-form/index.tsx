import type { Credential } from '@/core/domain/entities'

import { CredentialFormView } from './credential-form-view'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { useAuthContext } from '@/ui/hooks/use-auth-context'

type Props = {
  credential: Credential | null
  onCreate: (credential: Credential) => Promise<void>
  onUpdate: (credential: Credential) => Promise<void>
}

export const CredentialForm = ({ credential, onCreate, onUpdate }: Props) => {
  const cryptoProvider = useCryptoProvider()
  const { encryptionKey } = useAuthContext()

  const encryptedData = credential?.encrypted.decrypt(encryptionKey, cryptoProvider)
  console.log('Decrypted', credential?.encrypted.decrypt)

  return (
    <CredentialFormView
      credential={credential}
      cryptoProvider={cryptoProvider}
      encryptionKey={encryptionKey}
      onCreate={onCreate}
      onUpdate={onUpdate}
    />
  )
}
