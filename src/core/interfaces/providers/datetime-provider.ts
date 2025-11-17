export interface DateTimeProvider {
  addDays(date: Date, days: number): Date
  addMonths(date: Date,months: number): Date
  addYears(date: Date,years: number): Date
  isAfter(date: Date, otherDate: Date): boolean
}