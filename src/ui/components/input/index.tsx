import type { IconName } from '../icon/types'
import { InputView } from './input-view'
import { useInput } from './use-input'

type Props = {
  type?: 'text' | 'password' | 'number'
  value?: string
  defaultValue?: string
  label?: string
  icon: IconName
  placeholder?: string
  hasAutofocus?: boolean
  className?: string
  isReadOnly?: boolean
  isRequired?: boolean
  endContent?: React.ReactNode
  hasCapitalize?: boolean
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Input = ({
  type = 'text',
  value,
  defaultValue,
  label,
  icon,
  placeholder,
  hasAutofocus,
  isReadOnly,
  isRequired,
  endContent,
  className,
  hasCapitalize,
  onChange,
  onFocus,
  onBlur,
}: Props) => {
  const { handleChange } = useInput({ type, onChange })

  return (
    <InputView
      type={type}
      value={value}
      defaultValue={defaultValue}
      label={label}
      icon={icon}
      placeholder={placeholder}
      endContent={endContent}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      className={className}
      hasCapitalize={hasCapitalize}
      hasAutofocus={hasAutofocus}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}
