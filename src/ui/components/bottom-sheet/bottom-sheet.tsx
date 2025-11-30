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
import type { Theme } from '@/ui/contexts/theme-context/types'

type Props = {
  children: ReactNode | ((close: () => void, backgroundColor: string) => ReactNode)
  snapPoints?: string[]
  bottomSheetModalRef: RefObject<BottomSheetModal | null>
  trigger: ReactNode
  theme: Theme
  backgroundColor?: keyof typeof COLORS.dark
  onTriggerPress?: () => void
  onChange: (index: number) => void
}

export const BottomSheetView = ({
  children,
  snapPoints = ['35%', '50%'],
  bottomSheetModalRef,
  trigger,
  theme,
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
        backgroundStyle={{ backgroundColor: COLORS[theme][backgroundColor] }}
      >
        <BottomSheetContent
          className='flex-1'
          style={{ backgroundColor: COLORS[theme][backgroundColor] }}
        >
          <UiProvider key={backgroundColor}>
            {typeof children === 'function'
              ? children(
                  () => bottomSheetModalRef.current?.close(),
                  COLORS[theme][backgroundColor],
                )
              : children}
          </UiProvider>
        </BottomSheetContent>
      </BottomSheetModal>
    </>
  )
}
