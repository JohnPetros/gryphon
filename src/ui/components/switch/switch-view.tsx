import { Box } from '@/ui/gluestack/box'
import { Switch } from '@/ui/gluestack/switch'
import { Text } from '@/ui/gluestack/text'

type Props = {
  isChecked: boolean
  label: string
  onChange: (isChecked: boolean) => void
}

export const SwitchView = ({ isChecked, label, onChange }: Props) => {
  return (
    <Box className='w-full flex-row items-center justify-between px-6 py-4 bg-surface'>
      <Text className='text-lg font-bold text-accent'>{label}</Text>
      <Switch value={isChecked} onToggle={onChange} />
    </Box>
  )
}
