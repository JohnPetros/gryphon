export type CredentialVersionSchema = {
  id: string
  title: string
  credential_id: string
  is_restoration: boolean
  version_number: number
  encrypted_data: string
  site_url: string | null
  created_at: number
  updated_at: number
}
