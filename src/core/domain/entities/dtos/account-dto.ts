import type { CredentialRotationDto } from './credential-rotation-dto'

export type AccountDto = {
  id?: string
  email: string
  encryptionSalt: string
  isBiometryActivated: boolean
  minimumPasswordStrength: number
  autoLockTimeout: number
  isMasterPasswordRequired: boolean
  notificationToken: string | null
  kcv: string
  credentialRotation: CredentialRotationDto
}
