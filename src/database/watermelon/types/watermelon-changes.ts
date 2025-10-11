import type { SyncDatabaseChangeSet } from '@nozbe/watermelondb/sync'
import type { AccountSchema } from './account-schema'
import type { CredentialSchema } from './credential-schema'
import type { NoteSchema } from './note-schema'
import type { VaultSchema } from './vault-schema'
import type { CredentialVersionSchema } from './credential-version-schema'

export type WatermelonChanges = {
  accounts?: {
    created: AccountSchema[]
    updated: AccountSchema[]
    deleted: string[]
  }
  vaults?: {
    created: VaultSchema[]
    updated: VaultSchema[]
    deleted: string[]
  }
  credentials?: {
    created: CredentialSchema[]
    updated: CredentialSchema[]
    deleted: string[]
  }
  credential_versions?: {
    created: CredentialVersionSchema[]
    updated: CredentialVersionSchema[]
    deleted: string[]
  }
  notes?: {
    created: NoteSchema[]
    updated: NoteSchema[]
    deleted: string[]
  }
} & SyncDatabaseChangeSet
