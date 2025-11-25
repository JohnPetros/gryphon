import { useDatetime } from '@/ui/hooks/use-datetime'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { OutdatedCredentialBadgeView } from './outdated-credential-badge-view'
import type { Credential } from '@/core/domain/entities'

type Props = {
  credential: Credential
}

export const OutdatedCredentialBadge = ({ credential }: Props) => {
  const datetimeProvider = useDatetime()
  const { account } = useAuthContext()
  if (!account) return

  const isOutdated = credential.isOutdated(account.credentialRotation, datetimeProvider)

  if (isOutdated) return <OutdatedCredentialBadgeView />
}
