import { Input, InputField, InputSlot } from '@/ui/gluestack/input'
import { Text } from '@/ui/gluestack/text'
import { Icon } from '@/ui/components/icon'
import type { IconName } from '../icon/types'

type Props = {
  type?: 'text' | 'password'
  label: string
  icon: IconName
  placeholder?: string
  endContent?: React.ReactNode
  onChange?: (value: string) => void
}

export const InputView = ({
  type = 'text',
  label,
  icon,
  placeholder,
  endContent,
  onChange,
}: Props) => {
  return (
    <Input
      variant='outline'
      className='h-24 px-4 bg-surface border-neutral-background border-[0.5px]'
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
    >
      <InputSlot className='pl-3'>
        <Icon name={icon} color='neutral' size={24} />
      </InputSlot>
      <InputSlot className='absolute top-4 left-16'>
        <Text>{label}</Text>
      </InputSlot>
      <InputField
        type={type}
        placeholder={placeholder}
        autoCapitalize='none'
        onChangeText={onChange}
        className='text-xl translate-y-2'
      />
      {endContent && <InputSlot className='pl-3'>{endContent}</InputSlot>}
    </Input>
  )
}
