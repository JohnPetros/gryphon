export class Password {
  readonly value: string
  private static readonly MIN_LENGTH = 8

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string): Password {
    return new Password(value)
  }

  get strength(): number {
    let score = 0
    if (this.hasMinLength) score++
    if (this.hasUppercase) score++
    if (this.hasLowercase) score++
    if (this.hasNumber) score++
    if (this.hasSpecialChar) score++
    return score
  }

  get hasValue(): boolean {
    return Boolean(this.value.length)
  }

  get hasMinLength(): boolean {
    return this.value.length >= Password.MIN_LENGTH
  }

  get hasUppercase(): boolean {
    return /[A-Z]/.test(this.value)
  }

  get hasLowercase(): boolean {
    return /[a-z]/.test(this.value)
  }

  get hasNumber(): boolean {
    return /[0-9]/.test(this.value)
  }

  get hasSpecialChar(): boolean {
    return /[!@#$%^&*]/.test(this.value)
  }
}
