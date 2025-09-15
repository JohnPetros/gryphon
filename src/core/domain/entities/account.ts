import { Entity } from '../abstracts/entity'
import type { AccountDto } from './dtos/account-dto'

type AccountProps = {
  email: string
  encryptionSalt: string
  isBiometryActivated: boolean
  minimumPasswordStrength: number
  minimumAppLockTimeInSeconds: number
  isMasterPasswordRequired: boolean
}

export class Account extends Entity<AccountProps> {
  static create(dto: AccountDto) {
    return new Account(dto, dto.id)
  }

  get encryptionSalt(): string {
    return this.props.encryptionSalt
  }

  get email(): string {
    return this.props.email
  }

  get isBiometryActivated(): boolean {
    return this.props.isBiometryActivated
  }

  get minimumPasswordStrength(): number {
    return this.props.minimumPasswordStrength
  }

  set minimumPasswordStrength(value: number) {
    this.props.minimumPasswordStrength = value
  }

  get minimumAppLockTimeInSeconds(): number {
    return this.props.minimumAppLockTimeInSeconds
  }

  get isMasterPasswordRequired(): boolean {
    return this.props.isMasterPasswordRequired
  }

  get dto(): AccountDto {
    return {
      id: this.id.value,
      email: this.props.email,
      encryptionSalt: this.props.encryptionSalt,
      isBiometryActivated: this.props.isBiometryActivated,
      minimumPasswordStrength: this.props.minimumPasswordStrength,
      minimumAppLockTimeInSeconds: this.props.minimumAppLockTimeInSeconds,
      isMasterPasswordRequired: this.props.isMasterPasswordRequired,
    }
  }
}
