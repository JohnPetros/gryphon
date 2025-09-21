import { withObservables } from '@nozbe/watermelondb/react'

import type { Credential } from '@/core/domain/entities'

import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { CredentialListItemView } from './credential-list-item-view'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'

type Props = {
  credential: Credential
}

const Wdiget = ({ credential }: Props) => {
  const { encryptionKey } = useAuthContext()
  const cryptoProvider = useCryptoProvider()

  return (
    <CredentialListItemView
      credential={credential}
      encryptionKey={encryptionKey}
      cryptoProvider={cryptoProvider}
    />
  )
}

const WidgetWithObservables = withObservables(
  ['credential'],
  ({ credential }: Props) => ({
    credential,
  }),
)

export const CredentialListItem = WidgetWithObservables(Wdiget)
