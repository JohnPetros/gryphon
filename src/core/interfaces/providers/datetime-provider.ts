export interface DateTimeProvider {
  formatDate(date: Date): string
  addDays(date: Date, days: number): Date
  addMonths(date: Date, months: number): Date
  addYears(date: Date, years: number): Date
  subtractDays(date: Date, days: number): Date
  subtractMonths(date: Date, months: number): Date
  subtractYears(date: Date, years: number): Date
  isAfter(date: Date, otherDate: Date): boolean
}
