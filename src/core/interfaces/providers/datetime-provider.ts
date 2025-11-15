export interface DatetimeProvider {
  formatDate: (date: Date) => string
  getCurrentTimestamp: () => string
}
