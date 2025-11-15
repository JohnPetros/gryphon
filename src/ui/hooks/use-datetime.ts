import type { DatetimeProvider } from '@/core/interfaces/providers'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { useCallback } from 'react'

export function useDatetimeProvider(): DatetimeProvider {
  const formatDate = useCallback((date: Date) => {
    return dayjs(date).subtract(3, 'hours').locale('pt-br').format('D [de] MMMM, HH:mm')
  }, [])

  const getCurrentTimestamp = useCallback(() => {
    return dayjs().format('YYYY-MM-DD-HH_mm_ss')
  }, [])

  return {
    formatDate,
    getCurrentTimestamp,
  }
}
