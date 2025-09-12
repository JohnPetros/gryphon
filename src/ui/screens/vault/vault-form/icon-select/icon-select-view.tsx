import { useRef } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

import type { VaultIcon } from '@/core/domain/types'
import { Icon } from '@/ui/components/icon'
import { Box } from '@/ui/gluestack/box'
import { Pressable } from '@/ui/gluestack/pressable'
import { Text } from '@/ui/gluestack/text'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

type Props = {
  value: VaultIcon
  onSelect: (icon: string) => void
}

export const IconSelectView = ({ value, onSelect }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleSheetChanges(index: number) {
    console.log('handleSheetChanges', index)
  }

  return (
    <>
      <Pressable
        onPress={() => onSelect(value)}
        className='flex-1 flex-row items-center justify-between h-16 px-3 bg-info-background'
      >
        <Box className='flex-1 items-center justify-center'>
          <Icon name={value} />
        </Box>
        <Icon name='arrow-down' />
      </Pressable>

      <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
        <BottomSheetView>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}
