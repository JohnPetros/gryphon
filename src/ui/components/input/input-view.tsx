import { Input, InputField, InputSlot } from '@/ui/gluestack/input'
import { Text } from '@/ui/gluestack/text'
import { Icon } from '@/ui/components/icon'
import type { IconName } from '../icon/types'
import { mergeClassNames } from '@/ui/utils'
import { Box } from '@/ui/gluestack/box'

type Props = {
  type?: 'text' | 'password' | 'number'
  value?: string
  defaultValue?: string
  label?: string
  icon: IconName
  placeholder?: string
  endContent?: React.ReactNode
  isReadOnly?: boolean
  isRequired?: boolean
  className?: string
  hasCapitalize?: boolean
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const InputView = ({
  type = 'text',
  value,
  defaultValue,
  label,
  icon,
  placeholder,
  endContent,
  isReadOnly,
  isRequired,
  className,
  hasCapitalize,
  onChange,
  onFocus,
  onBlur,
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
      isReadOnly={isReadOnly}
      isRequired={isRequired}
    >
      <InputSlot className='pl-3'>
        <Icon name={icon} color='neutral' size={24} />
      </InputSlot>
      {label && (
        <InputSlot className='absolute top-4 left-16'>
          <Box className='flex-row gap-1'>
            <Text>{label}</Text>
            {isRequired && <Text className='-translate-y-1 text-sm'>*</Text>}
          </Box>
        </InputSlot>
      )}
      <InputField
        type={type === 'number' ? 'text' : type}
        value={value ?? defaultValue ?? undefined}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
        autoCapitalize={hasCapitalize ? 'words' : 'none'}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        keyboardType={type === 'number' ? 'numeric' : 'default'}
        className={mergeClassNames('text-xl', label && 'translate-y-2')}
      />
      {endContent && <InputSlot className='pl-3'>{endContent}</InputSlot>}
    </Input>
  )
}
