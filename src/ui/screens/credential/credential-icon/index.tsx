import { CredentialIconView } from './credential-icon-view'
import { useCredentialIcon } from './use-credential-icon'

type Props = {
  siteUrl: string
}

export const CredentialIcon = ({ siteUrl }: Props) => {
  const { hasError, faviconUrl, handleError } = useCredentialIcon(siteUrl)

  return (
    <CredentialIconView siteUrl={faviconUrl} hasError={hasError} onError={handleError} />
  )
}
