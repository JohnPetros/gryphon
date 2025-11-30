import { CredentialIconView } from './credential-icon-view'
import { useCredentialIcon } from './use-credential-icon'

type Props = {
  siteUrl: string
  className?: string
}

export const CredentialIcon = ({ siteUrl, className }: Props) => {
  const { hasError, faviconUrl, handleError } = useCredentialIcon(siteUrl)

  return (
    <CredentialIconView
      siteUrl={faviconUrl}
      hasError={hasError}
      className={className}
      onError={handleError}
    />
  )
}
