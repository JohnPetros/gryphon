import { Input, InputField, InputSlot } from '@/ui/gluestack/input'
import { Box } from '@/ui/gluestack/box'
import { Pressable } from '../../pressable'
import { Icon } from '../../icon'

type Props = {
  value: string
  onCopy: (value: string) => void
  onReload: () => void
}

export const PasswordInputView = ({ value, onCopy, onReload }: Props) => {
  return (
    <Input
      variant='outline'
      className='h-16 bg-neutral'
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
    >
      <InputField className='text-2xl translate-y-2' value={value} />
      <InputSlot className='pl-3'>
        <Box className='flex-row gap-3'>
          <Pressable className='p-2' onPress={onReload}>
            <Icon name='reload' />
          </Pressable>
          <Pressable className='p-2' onPress={() => onCopy(value)}>
            <Icon name='copy' />
          </Pressable>
        </Box>
      </InputSlot>
    </Input>
  )
}
