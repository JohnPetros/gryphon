import { Account } from '@/core/domain/entities'

import type { DrizzleAccount } from '../types/drizzle-account'

export const DrizzleAccountMapper = () => {
  return {
    toEntity(drizzleAccount: DrizzleAccount): Account {
      return Account.create({
        id: drizzleAccount.id,
        email: drizzleAccount.email ?? '',
        encryptionSalt: drizzleAccount.encryptionSalt ?? '',
        isBiometryActivated: drizzleAccount.isBiometryActivated === 1,
        minimumPasswordStrength: drizzleAccount.minimumPasswordStrength ?? 3,
        autoLockTimeout: drizzleAccount.autoLockTimeout ?? 0,
        kcv: drizzleAccount.kcv ?? '',
        isMasterPasswordRequired: drizzleAccount.isMasterPasswordRequired === 1,
        notificationToken: drizzleAccount.notificationToken ?? null,
      })
    },
  }
}
