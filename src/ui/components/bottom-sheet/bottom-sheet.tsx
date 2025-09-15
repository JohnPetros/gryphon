import type { ReactNode, RefObject } from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView as BottomSheetContent,
} from '@gorhom/bottom-sheet'

import { COLORS } from '@/constants/colors'
import { BottomSheetDragIndicator } from '@/ui/gluestack/bottomsheet'
import { UiProvider } from '@/ui/gluestack/ui-provider'
import { Pressable } from '../pressable'

type Props = {
  children: ReactNode
  snapPoints?: string[]
  bottomSheetModalRef: RefObject<BottomSheetModal | null>
  trigger: React.ReactNode
  backgroundColor?: keyof typeof COLORS.dark
  onTriggerPress?: () => void
}

export const BottomSheetView = ({
  children,
  snapPoints = ['35%', '50%'],
  bottomSheetModalRef,
  trigger,
  backgroundColor = 'background',
  onTriggerPress,
}: Props) => {
  return (
    <>
      <Pressable onPress={onTriggerPress}>{trigger}</Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={1}
        backdropComponent={BottomSheetBackdrop}
        handleComponent={BottomSheetDragIndicator}
        backgroundStyle={{ backgroundColor: COLORS.dark[backgroundColor] }}
      >
        <BottomSheetContent className='flex-1'>
          <UiProvider>{children}</UiProvider>
        </BottomSheetContent>
      </BottomSheetModal>
    </>
  )
}
