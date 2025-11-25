import { FlatList } from 'react-native'
import { Box } from '@/ui/gluestack/box'
import { Pressable } from '@/ui/gluestack/pressable'
import { Text } from '@/ui/gluestack/text'
import { BottomSheet } from '../bottom-sheet'
import { Icon } from '../icon'

type Props = {
  value: string
  label: string
  options: string[]
  onChange: (value: string) => void
}

export const SelectView = ({ value, label, options, onChange }: Props) => {
  return (
    <BottomSheet
      snapPoints={['40%', '75%']}
      trigger={
        <Box className='w-full flex-row items-center justify-between px-6 py-4 bg-surface'>
          <Box className='gap-y-1'>
            <Text className='text-sm font-bold text-neutral'>{label}</Text>
            <Text className='text-lg font-bold text-accent'>{value}</Text>
          </Box>
          <Icon name='arrow-down' color='neutral' />
        </Box>
      }
    >
      {(close) => (
        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item: option }) => (
            <Pressable
              onPress={() => {
                onChange(option)
                close()
              }}
              className='px-6'
              style={{ backgroundColor: 'transparent' }}
            >
              <Text className='text-lg'>{option}</Text>
            </Pressable>
          )}
          ItemSeparatorComponent={() => (
            <Box className='px-6 bg-surface' style={{ backgroundColor: 'transparent' }}>
              <Box className='h-0.5 w-full my-2 bg-neutral-background' />
            </Box>
          )}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </BottomSheet>
  )
}
