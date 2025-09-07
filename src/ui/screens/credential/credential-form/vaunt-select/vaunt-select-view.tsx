import type { Vaunt } from '@/core/domain/entities'
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
  vaunts: Vaunt[]
}

export const VauntSelectView = ({ vaunts }: Props) => {
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
          {vaunts.map((vaunt) => (
            <SelectItem key={vaunt.id.value} label={vaunt.title} value={vaunt.id.value} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}
