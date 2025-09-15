import { Input, InputField, InputSlot } from '@/ui/gluestack/input'
import { Box } from '@/ui/gluestack/box'
import { Pressable } from '../../pressable'
import { Icon } from '../../icon'

type Props = {
  value: string
  onCopy: (value: string) => void
  onChange: (value: string) => void
  onReload: () => void
}

export const PasswordInputView = ({ value, onCopy, onChange, onReload }: Props) => {
  return (
    <Input
      variant='outline'
      className='h-20 bg-black'
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
    >
      <InputField className='text-2xl' value={value} onChangeText={onChange} />
      <InputSlot className='pl-3'>
        <Box className='flex-row gap-3 px-6'>
          <Pressable className='p-2' onPress={onReload}>
            <Icon name='reload' color='primary' />
          </Pressable>
          <Pressable className='p-2' onPress={() => onCopy(value)}>
            <Icon name='copy' color='primary' />
          </Pressable>
        </Box>
      </InputSlot>
    </Input>
  )
}
