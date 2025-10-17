import { Textarea, TextareaInput } from '@/ui/gluestack/textarea'
import { mergeClassNames } from '@/ui/utils/merge-class-names'
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
  isBlocked?: boolean
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
  isBlocked,
  onChange,
}: Props) => {
  return (
    <Textarea
      size='md'
      isReadOnly={isBlocked}
      isInvalid={false}
      isDisabled={false}
      className={mergeClassNames(
        'h-64 px-4 bg-surface border-neutral-background border-[0.5px]',
        className,
      )}
    >
      <Box className='flex flex-row gap-2 pt-4'>
        <Box className='pl-3'>
          <Icon name={icon} color='neutral' size={24} />
        </Box>
        {label && (
          <Box>
            <Box className='flex-row gap-1'>
              <Text>{label}</Text>
              {isRequired && <Text className='-translate-y-1 text-sm'>*</Text>}
            </Box>
          </Box>
        )}
      </Box>
      <TextareaInput
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value ?? defaultValue ?? undefined}
        className='pl-4 text-xl'
        onChangeText={onChange}
      />
    </Textarea>
  )
}
