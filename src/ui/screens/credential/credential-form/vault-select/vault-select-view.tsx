import type { Vault } from '@/core/domain/entities'
import { Icon } from '@/ui/components/icon'
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/ui/gluestack/select'
import { SelectInput } from '@/ui/gluestack/select'

type Props = {
  vaults: Vault[]
}

export const VaultSelectView = ({ vaults }: Props) => {
  return (
    <Select>
      <SelectTrigger>
        <SelectInput />
        <Icon name='arrow-down' />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {vaults.map((vault) => (
            <SelectItem key={vault.id.value} label={vault.title} value={vault.id.value} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}
