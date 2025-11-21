export type AccountSchema = {
  id: string
  email: string
  encryption_salt: string
  kcv: string
  is_biometry_activated: boolean
  minimum_password_strength: number
  auto_lock_timeout: number
  is_master_password_required: boolean
  notification_token: string | null
  credential_rotation_unit: string
  credential_rotation_interval: number
}
