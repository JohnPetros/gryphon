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
  const { account } = useAuthContext()
  const cryptoProvider = useCryptoProvider()
  const { encryptionKey } = useAuthContext()

  return (
    <CredentialFormView
      credential={credential}
      cryptoProvider={cryptoProvider}
      encryptionKey={encryptionKey}
      minimumPasswordStrength={account?.minimumPasswordStrength || 3}
      onCreate={onCreate}
      onUpdate={onUpdate}
    />
  )
}
