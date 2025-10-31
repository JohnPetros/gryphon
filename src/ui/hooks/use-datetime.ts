import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { useCallback } from 'react'

export function useDatetime() {
  const formatDate = useCallback((date: Date) => {
    return dayjs(date)
      .subtract(3, 'hours')
      .locale('pt-br')
      .format('D [de] MMMM, HH:mm')
  }, [])

  return { formatDate }
}
