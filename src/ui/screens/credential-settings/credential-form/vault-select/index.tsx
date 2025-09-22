import { Id } from '@/core/domain/structures'

import { useDatabase } from '@/ui/hooks/use-database'
import { useAuthContext } from '@/ui/hooks/use-auth-context'
import { useVaultSelect } from './use-vaunt-select'
import { VaultSelectView } from './vault-select-view'

type Props = {
  defaultValue: string
  onChange: (vaultId: string) => void
}

export const VaultSelect = ({ defaultValue, onChange }: Props) => {
  const { vaultsRepository } = useDatabase()
  const { account } = useAuthContext()
  const { vaults, selectedVault, handleChange } = useVaultSelect({
    vaultsRepository,
    accountId: account?.id ?? Id.create(),
    onChange,
  })

  return (
    <VaultSelectView
      vaults={vaults}
      selectedVault={selectedVault}
      onChange={handleChange}
    />
  )
}
