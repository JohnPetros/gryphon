
type CredentialRotationUnit = 'days' | 'weeks' | 'months' | 'years'

export class CredentialRotation {
  private constructor(readonly unit: CredentialRotationUnit, readonly interval: number) {}

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