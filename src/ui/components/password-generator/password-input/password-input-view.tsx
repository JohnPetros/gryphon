import { Input, InputField, InputSlot } from '@/ui/gluestack/input'
import { Box } from '@/ui/gluestack/box'
import { Pressable } from '../../pressable'
import { Icon } from '../../icon'

type Props = {
  value: string
  isInvalid: boolean
  onCopy: (value: string) => void
  onChange: (value: string) => void
  onReload: () => void
}

export const PasswordInputView = ({
  value,
  isInvalid,
  onCopy,
  onChange,
  onReload,
}: Props) => {
  return (
    <Input
      variant='outline'
      className='h-20 px-6 bg-black'
      isDisabled={false}
      isReadOnly={false}
    >
      <InputField
        className='text-2xl'
        autoCapitalize='none'
        value={value}
        onChangeText={onChange}
      />
      <InputSlot>
        <Box className='flex-row gap-3'>
          <Pressable className='p-2' onPress={onReload}>
            <Icon name='reload' color={isInvalid ? 'danger' : 'primary'} />
          </Pressable>
          <Pressable className='p-2' onPress={() => onCopy(value)}>
            <Icon name='copy' color={isInvalid ? 'danger' : 'primary'} />
          </Pressable>
        </Box>
      </InputSlot>
    </Input>
  )
}
