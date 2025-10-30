export type CredentialSchema = {
  id: string
  title: string
  site_url: string | null
  vault_id: string
  encrypted_data: string
  last_version_id: string | null
  created_at: number
  updated_at: number
}
