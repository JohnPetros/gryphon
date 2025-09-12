import { Model } from '@nozbe/watermelondb'
import { children, field } from '@nozbe/watermelondb/decorators'

import type { VaultModel } from './vault-model'

export class AccountModel extends Model {
  static table = 'accounts'

  @children('vaults') vaults!: VaultModel[]

  @field('email')
  email!: string

  @field('encryption_salt')
  encryptionSalt!: string

  @field('is_biometry_activated')
  isBiometryActivated!: boolean

  @field('minimum_password_strength')
  minimumPasswordStrength!: string

  @field('minimum_app_lock_time_in_seconds')
  minimumAppLockTimeInSeconds!: number

  @field('is_master_password_required')
  isMasterPasswordRequired!: boolean
}
