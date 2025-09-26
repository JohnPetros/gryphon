import { Account } from '@/core/domain/entities'

import type { AccountModel } from '../models'

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
        isMasterPasswordRequired: model.isMasterPasswordRequired,
      })
    },
  }
}
