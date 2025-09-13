import { Input, InputField, InputSlot } from '@/ui/gluestack/input'
import { Text } from '@/ui/gluestack/text'
import { Icon } from '@/ui/components/icon'
import type { IconName } from '../icon/types'
import { mergeClassNames } from '@/ui/utils'

type Props = {
  type?: 'text' | 'password' | 'number'
  value?: string
  label?: string
  icon: IconName
  placeholder?: string
  endContent?: React.ReactNode
  className?: string
  onChange?: (value: string) => void
}

export const InputView = ({
  type = 'text',
  value,
  label,
  icon,
  placeholder,
  endContent,
  className,
  onChange,
}: Props) => {
  return (
    <Input
      variant='outline'
      className={mergeClassNames(
        'h-24 px-4 bg-surface border-neutral-background border-[0.5px]',
        className,
      )}
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
    >
      <InputSlot className='pl-3'>
        <Icon name={icon} color='neutral' size={24} />
      </InputSlot>
      {label && (
        <InputSlot className='absolute top-4 left-16'>
          <Text>{label}</Text>
        </InputSlot>
      )}
      <InputField
        type={type === 'number' ? 'text' : type}
        value={value ?? undefined}
        placeholder={placeholder}
        autoCapitalize='none'
        onChangeText={onChange}
        keyboardType={type === 'number' ? 'numeric' : 'default'}
        className={mergeClassNames('text-xl', label && 'translate-y-2')}
      />
      {endContent && <InputSlot className='pl-3'>{endContent}</InputSlot>}
    </Input>
  )
}
