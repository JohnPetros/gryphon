import type { IconName } from '../icon/types'
import { InputView } from './input-view'
import { useInput } from './use-input'

type Props = {
  type?: 'text' | 'password' | 'number'
  value?: string
  label: string
  icon: IconName
  placeholder?: string
  endContent?: React.ReactNode
  onChange?: (value: string) => void
}

export const Input = ({
  type = 'text',
  value,
  label,
  icon,
  placeholder,
  endContent,
  onChange,
}: Props) => {
  const { handleChange } = useInput({ type, onChange })

  return (
    <InputView
      type={type}
      value={value}
      label={label}
      icon={icon}
      placeholder={placeholder}
      endContent={endContent}
      onChange={handleChange}
    />
  )
}
