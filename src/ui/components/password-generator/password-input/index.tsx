import { useClipboard } from '@/ui/hooks/use-clipbaord'
import { PasswordInputView } from './password-input-view'

type Props = {
  value: string
  isInvalid: boolean
  onReload: () => void
  onChange: (value: string) => void
}

export const PasswordInput = ({ value, isInvalid, onReload, onChange }: Props) => {
  const { copy } = useClipboard()

  return (
    <PasswordInputView
      value={value}
      isInvalid={isInvalid}
      onCopy={copy}
      onReload={onReload}
      onChange={onChange}
    />
  )
}
