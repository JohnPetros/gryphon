export class Id {
  readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value?: string) {
    return new Id(value ?? Id.generateRandomValue())
  }

  private static generateRandomValue() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (string) => {
      const random = (Math.random() * 16) | 0
      const value = string === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    })
  }
}
