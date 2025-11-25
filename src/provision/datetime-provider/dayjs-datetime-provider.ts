import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import type { DateTimeProvider } from '@/core/interfaces/providers/datetime-provider'

export const DayjsDateTimeProvider = (): DateTimeProvider => {
  function getDate(date: Date) {
    return dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
  }

  return {
    formatDate(date: Date): string {
      return dayjs(date).subtract(3, 'hours').locale('pt-br').format('D [de] MMMM, HH:mm')
    },

    addDays(date: Date, days: number): Date {
      return dayjs(date).add(days, 'days').toDate()
    },

    addMonths(date: Date, months: number): Date {
      return dayjs(date).add(months, 'months').toDate()
    },

    addYears(date: Date, years: number): Date {
      return dayjs(date).add(years, 'years').toDate()
    },

    subtractDays(date: Date, days: number): Date {
      return dayjs(date).subtract(days, 'days').toDate()
    },

    subtractWeeks(date: Date, days: number): Date {
      return dayjs(date).subtract(days, 'weeks').toDate()
    },

    subtractMonths(date: Date, months: number): Date {
      return dayjs(date).subtract(months, 'months').toDate()
    },

    subtractYears(date: Date, years: number): Date {
      return dayjs(date).subtract(years, 'years').toDate()
    },

    isAfter(date: Date, otherDate: Date): boolean {
      return dayjs(getDate(date)).isAfter(getDate(otherDate))
    },
  }
}
