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
import { Alert } from 'react-native'

type Props = {
  children: ReactNode | ((close: () => void) => ReactNode)
  snapPoints?: string[]
  bottomSheetModalRef: RefObject<BottomSheetModal | null>
  trigger: ReactNode
  backgroundColor?: keyof typeof COLORS.dark
  onTriggerPress?: () => void
  onChange: (index: number) => void
}

export const BottomSheetView = ({
  children,
  snapPoints = ['35%', '50%'],
  bottomSheetModalRef,
  trigger,
  backgroundColor = 'background',
  onTriggerPress,
  onChange,
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
        onChange={onChange}
        backgroundStyle={{ backgroundColor: COLORS.dark[backgroundColor] }}
      >
        <BottomSheetContent className='flex-1'>
          <UiProvider>
            {typeof children === 'function'
              ? children(() => bottomSheetModalRef.current?.close())
              : children}
          </UiProvider>
        </BottomSheetContent>
      </BottomSheetModal>
    </>
  )
}
