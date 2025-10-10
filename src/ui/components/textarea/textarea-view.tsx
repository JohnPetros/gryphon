import { Textarea, TextareaInput } from '@/ui/gluestack/textarea'
import { mergeClassNames } from '@/ui/utils/merge-class-names'
import { InputSlot } from '@/ui/gluestack/input'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { Icon } from '@/ui/components/icon'
import type { IconName } from '../icon/types'

type Props = {
  label?: string
  icon: IconName
  value?: string
  defaultValue?: string
  className?: string
  isRequired?: boolean
  placeholder?: string
  onChange: (value: string) => void
}

export const TextareaView = ({
  className,
  placeholder,
  label,
  icon,
  value,
  defaultValue,
  isRequired,
  onChange,
}: Props) => {
  return (
    <Textarea
      size='md'
      isReadOnly={false}
      isInvalid={false}
      isDisabled={false}
      className={mergeClassNames(
        'h-64 px-4 bg-surface border-neutral-background border-[0.5px]',
        className,
      )}
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
      <TextareaInput
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value ?? defaultValue ?? undefined}
        onChangeText={onChange}
      />
    </Textarea>
  )
}
