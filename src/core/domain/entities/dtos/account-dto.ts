export type AccountDto = {
  id?: string
  email: string
  encryptionSalt: string
  isBiometryActivated: boolean
  minimumPasswordStrength: string
  minimumAppLockTimeInSeconds: number
  isMasterPasswordRequired: boolean
}
