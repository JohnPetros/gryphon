import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { useCallback } from 'react'

import type { DateTimeProvider } from '@/core/interfaces/providers/datetime-provider'

export function useDatetimeProvider(): DateTimeProvider {
  const getDate = useCallback((date: Date) => {
    return dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
  }, [])

  const formatDate = useCallback((date: Date) => {
    return dayjs(date).subtract(3, 'hours').locale('pt-br').format('D [de] MMMM, HH:mm')
  }, [])
  const getCurrentTimestamp = useCallback(() => {
    return dayjs().format('YYYY-MM-DD-HH_mm_ss')
  }, [])

  const addDays = useCallback((date: Date, days: number) => {
    return dayjs(date).add(days, 'days').toDate()
  }, [])

  const addMonths = useCallback((date: Date, months: number) => {
    return dayjs(date).add(months, 'months').toDate()
  }, [])

  const addYears = useCallback((date: Date, years: number) => {
    return dayjs(date).add(years, 'years').toDate()
  }, [])

  const subtractDays = useCallback((date: Date, days: number) => {
    return dayjs(date).subtract(days, 'days').toDate()
  }, [])

  const subtractWeeks = useCallback((date: Date, weeks: number) => {
    return dayjs(date).subtract(weeks, 'weeks').toDate()
  }, [])

  const subtractMonths = useCallback((date: Date, months: number) => {
    return dayjs(date).subtract(months, 'months').toDate()
  }, [])

  const subtractYears = useCallback((date: Date, years: number) => {
    return dayjs(date).subtract(years, 'years').toDate()
  }, [])

  const isAfter = useCallback(
    (date: Date, otherDate: Date) => {
      return getDate(date).isAfter(getDate(otherDate))
    },
    [getDate],
  )

  return {
    formatDate,
    addDays,
    addMonths,
    addYears,
    subtractDays,
    subtractMonths,
    subtractYears,
    subtractWeeks,
    isAfter,
    getCurrentTimestamp,
  }
}
