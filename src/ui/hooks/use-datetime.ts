import { useCallback } from 'react'

export function useDatetime() {
  const formatDate = useCallback((date: Date) => {
    const formatted = new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)

    return formatted
  }, [])

  return { formatDate }
}
