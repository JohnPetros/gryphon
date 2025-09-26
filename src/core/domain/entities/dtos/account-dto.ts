export type AccountDto = {
  id?: string
  email: string
  encryptionSalt: string
  isBiometryActivated: boolean
  minimumPasswordStrength: number
  autoLockTimeout: number
  isMasterPasswordRequired: boolean
}
