type PasswordGeneratorConfig = {
  length: number
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumbers: boolean
  hasSymbols: boolean
}

export class Password {
  readonly value: string
  private static readonly MIN_LENGTH = 8
  private static readonly CHARSETS = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  }

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string): Password {
    return new Password(value)
  }

  static createFromStrength(strength: number): Password {
    return Password.createRandom({
      length: strength >= 1 ? 8 : 6,
      hasLowercase: strength >= 2,
      hasUppercase: strength >= 3,
      hasNumbers: strength >= 4,
      hasSymbols: strength >= 5,
    })
  }

  static createRandom({
    length,
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols,
  }: PasswordGeneratorConfig): Password {
    const enabledSets: string[] = []
    if (hasLowercase) enabledSets.push(Password.CHARSETS.lowercase)
    if (hasUppercase) enabledSets.push(Password.CHARSETS.uppercase)
    if (hasNumbers) enabledSets.push(Password.CHARSETS.numbers)
    if (hasSymbols) enabledSets.push(Password.CHARSETS.symbols)

    if (enabledSets.length === 0) {
      enabledSets.push(Password.CHARSETS.lowercase)
    }

    const requiredChars: string[] = enabledSets.map(
      (set) => set[Math.floor(Math.random() * set.length)],
    )

    const pool = enabledSets.join('')

    const remaining: string[] = []
    for (let i = requiredChars.length; i < length; i++) {
      remaining.push(pool[Math.floor(Math.random() * pool.length)])
    }

    const allChars = [...requiredChars, ...remaining]
    for (let i = allChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allChars[i], allChars[j]] = [allChars[j], allChars[i]]
    }

    return new Password(allChars.join(''))
  }

  get strength(): number {
    let score = 0
    if (this.hasMinLength) score++
    if (this.hasUppercase) score++
    if (this.hasLowercase) score++
    if (this.hasNumbers) score++
    if (this.hasSymbols) score++
    return score
  }

  get length(): number {
    return this.value.length
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

  get hasNumbers(): boolean {
    return /[0-9]/.test(this.value)
  }

  get hasSymbols(): boolean {
    return /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(this.value)
  }
}
