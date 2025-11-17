import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class AccountModel extends Model {
  static table = 'accounts'

  @field('email')
  email!: string

  @field('encryption_salt')
  encryptionSalt!: string

  @field('kcv')
  kcv!: string

  @field('notification_token')
  notification_token!: string | null

  @field('is_biometry_activated')
  isBiometryActivated!: boolean

  @field('minimum_password_strength')
  minimumPasswordStrength!: number

  @field('auto_lock_timeout')
  autoLockTimeout!: number

  @field('is_master_password_required')
  isMasterPasswordRequired!: boolean

  @field('credential_rotation_unit')
  credentialRotationUnit!: boolean

  @field('credential_rotation_interval')
  credentialRotationInterval!: boolean
}
