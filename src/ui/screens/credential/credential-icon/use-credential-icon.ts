import { useMemo, useState } from 'react'

export function useCredentialIcon(siteUrl: string) {
  const [hasError, setHasError] = useState(false)

  function handleError() {
    setHasError(true)
  }

  const faviconUrl = useMemo(() => {
    function getBaseUrl(url: string) {
      try {
        const urlObj = new URL(url)
        return `${urlObj.protocol}//${urlObj.hostname}`
      } catch {
        return url
      }
    }
    const baseUrl = getBaseUrl(siteUrl)
    const faviconUrl = `${baseUrl}/favicon.ico`
    return faviconUrl
  }, [siteUrl])

  return { faviconUrl, hasError, handleError }
}
