import { useClipboard } from '@/ui/hooks/use-clipbaord'
import { PasswordInputView } from './password-input-view'

type Props = {
  value: string
  onReload: () => void
  onChange: (value: string) => void
}

export const PasswordInput = ({ value, onReload, onChange }: Props) => {
  const { copy } = useClipboard()

  return (
    <PasswordInputView
      value={value}
      onCopy={copy}
      onReload={onReload}
      onChange={onChange}
    />
  )
}
