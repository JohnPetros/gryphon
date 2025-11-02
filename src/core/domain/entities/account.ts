import { Entity } from '../abstracts/entity'
import type { AccountDto } from './dtos/account-dto'

type AccountProps = {
  email: string
  encryptionSalt: string
  isBiometryActivated: boolean
  minimumPasswordStrength: number
  autoLockTimeout: number
  isMasterPasswordRequired: boolean
  kcv: string
}

export class Account extends Entity<AccountProps> {
  static create(dto: AccountDto) {
    return new Account(dto, dto?.id)
  }

  get encryptionSalt(): string {
    return this.props.encryptionSalt
  }

  get kcv(): string {
    return this.props.kcv
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

  get autoLockTimeout(): number {
    return this.props.autoLockTimeout
  }

  set autoLockTimeout(value: number) {
    this.props.autoLockTimeout = value
  }

  get isMasterPasswordRequired(): boolean {
    return this.props.isMasterPasswordRequired
  }

  set isMasterPasswordRequired(value: boolean) {
    this.props.isMasterPasswordRequired = value
  }

  get dto(): AccountDto {
    return {
      id: this.id.value,
      email: this.props.email,
      encryptionSalt: this.props.encryptionSalt,
      isBiometryActivated: this.props.isBiometryActivated,
      minimumPasswordStrength: this.props.minimumPasswordStrength,
      autoLockTimeout: this.props.autoLockTimeout,
      isMasterPasswordRequired: this.props.isMasterPasswordRequired,
      kcv: this.props.kcv,
    }
  }
}
