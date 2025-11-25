import type { DateTimeProvider } from '@/core/interfaces/providers/datetime-provider'

type CredentialRotationUnit = 'days' | 'weeks' | 'months' | 'years'

export class CredentialRotation {
  private constructor(
    readonly unit: CredentialRotationUnit,
    readonly interval: number,
  ) {}

  static create(unit: string, interval: number) {
    if (!CredentialRotation.isRotationUnitValid(unit)) {
      throw new Error(`Invalid rotation unit: ${unit}`)
    }

    return new CredentialRotation(unit, interval)
  }

  static isRotationUnitValid(unit: string): unit is CredentialRotationUnit {
    const units = ['days', 'weeks', 'months', 'years']
    return units.includes(unit)
  }

  getExpirationDate(datetimeProvider: DateTimeProvider): Date {
    const currentDate = new Date()

    if (this.isForDays) {
      return datetimeProvider.subtractDays(currentDate, this.interval)
    }
    if (this.isForWeeks) {
      return datetimeProvider.subtractWeeks(currentDate, this.interval)
    }
    if (this.isForMonths) {
      return datetimeProvider.subtractMonths(currentDate, this.interval)
    }
    if (this.isForYears) {
      return datetimeProvider.subtractYears(currentDate, this.interval)
    }

    return currentDate
  }

  get isForDays(): boolean {
    return this.unit === 'days'
  }

  get isForWeeks(): boolean {
    return this.unit === 'weeks'
  }

  get isForMonths(): boolean {
    return this.unit === 'months'
  }

  get isForYears(): boolean {
    return this.unit === 'years'
  }
}
