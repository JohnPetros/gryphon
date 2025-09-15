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
  children: React.ReactNode
  snapPoints?: string[]
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>
  trigger: React.ReactNode
  onChange?: (index: number) => void
}

export const BottomSheetView = ({
  children,
  snapPoints = ['35%', '50%'],
  bottomSheetModalRef,
  trigger,
  onChange,
}: Props) => {
  return (
    <>
      <Pressable onPress={() => bottomSheetModalRef.current?.present()}>
        {trigger}
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={1}
        backdropComponent={BottomSheetBackdrop}
        handleComponent={BottomSheetDragIndicator}
        backgroundStyle={{ backgroundColor: COLORS.dark.background }}
        onChange={onChange ?? (() => {})}
      >
        <BottomSheetContent>
          <UiProvider>{children}</UiProvider>
        </BottomSheetContent>
      </BottomSheetModal>
    </>
  )
}
