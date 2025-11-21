import { Account } from '@/core/domain/entities'
import type { AccountDto } from '@/core/domain/entities/dtos'

import type { AccountModel } from '../models'
import type { AccountSchema } from '../types'

export const WatermelonAccountMapper = () => {
  return {
    toEntity(model: AccountModel): Account {
      return Account.create({
        id: model.id,
        email: model.email,
        encryptionSalt: model.encryptionSalt,
        isBiometryActivated: model.isBiometryActivated,
        minimumPasswordStrength: model.minimumPasswordStrength,
        autoLockTimeout: model.autoLockTimeout,
        kcv: model.kcv,
        isMasterPasswordRequired: model.isMasterPasswordRequired,
        notificationToken: model.notification_token,
        credentialRotation: {
          unit: model.credentialRotationUnit,
          interval: model.credentialRotationInterval,
        },
      })
    },

    toDto(schema: AccountSchema): AccountDto {
      return {
        id: schema.id,
        email: schema.email,
        encryptionSalt: schema.encryption_salt,
        isBiometryActivated: schema.is_biometry_activated,
        minimumPasswordStrength: schema.minimum_password_strength,
        kcv: schema.kcv,
        autoLockTimeout: schema.auto_lock_timeout,
        isMasterPasswordRequired: schema.is_master_password_required,
        notificationToken: schema.notification_token,
        credentialRotation: {
          unit: schema.credential_rotation_unit,
          interval: schema.credential_rotation_interval,
        },
      }
    },
  }
}
