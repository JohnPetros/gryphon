import { Entity } from '../abstracts/entity'
import type { AccountDto } from './dtos/account-dto'

type AccountProps = {
  email: string
  encryptionSalt: string
}

export class Account extends Entity<AccountProps> {
  static create(dto: AccountDto) {
    return new Account(dto)
  }

  get encryptionSalt(): string {
    return this.props.encryptionSalt
  }

  get email(): string {
    return this.props.email
  }

  get dto(): AccountDto {
    return {
      id: this.id.value,
      email: this.props.email,
      encryptionSalt: this.props.encryptionSalt,
    }
  }
}
