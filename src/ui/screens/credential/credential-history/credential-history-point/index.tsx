import type { IconName } from '@/ui/components/icon/types'
import { CredentialHistoryPointView } from './credential-history-point-view'
import { useDatetimeProvider } from '@/ui/hooks/use-datetime'
import { useCredentialHistoryPoint } from './use-credential-history-point'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useCryptoProvider } from '@/ui/hooks/use-crypto-provider'
import { useDatabase } from '@/ui/hooks/use-database'
import type { CredentialVersion } from '@/core/domain/entities/credential-version'
import type { Credential } from '@/core/domain/entities'

type Props = {
  credential: Credential
  credentialVersion: CredentialVersion
  isLastVersion: boolean
  icon: IconName
  title: string
  createdAt: Date
  onRestore: () => void
}

export const CredentialHistoryPoint = ({
  credential,
  credentialVersion,
  isLastVersion,
  icon,
  title,
  createdAt,
  onRestore,
}: Props) => {
  const { formatDate } = useDatetimeProvider()
  const { encryptionKey } = useAuthContext()
  const cryptoProvider = useCryptoProvider()
  const { credentialsRepository, credentialVersionsRepository } = useDatabase()
  const { login, password, handleCopyLogin, handleCopyPassword, handleRestore } =
    useCredentialHistoryPoint({
      credential,
      credentialVersion,
      encryptionKey,
      cryptoProvider,
      credentialsRepository,
      credentialVersionsRepository,
      onRestore,
    })

  return (
    <CredentialHistoryPointView
      isLastVersion={isLastVersion}
      icon={icon}
      title={title}
      date={formatDate(createdAt)}
      versionNumber={credentialVersion.versionNumber}
      isRestoration={credentialVersion.isRestoration}
      login={login}
      password={password}
      onCopyLogin={handleCopyLogin}
      onCopyPassword={handleCopyPassword}
      onRestore={handleRestore}
    />
  )
}
