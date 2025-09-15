import type { VaultIcon } from '@/core/domain/types'
import { Icon } from '@/ui/components/icon'
import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetDragIndicator,
  BottomSheetPortal,
  BottomSheetTrigger,
} from '@/ui/gluestack/bottomsheet'
import { Box } from '@/ui/gluestack/box'
import { GridItem } from '@/ui/gluestack/grid'
import { Grid } from '@/ui/gluestack/grid'
import { Pressable } from '@/ui/gluestack/pressable'

type Props = {
  value: VaultIcon
  onSelect: (icon: VaultIcon) => void
}

export const VaultIconSelectView = ({ value, onSelect }: Props) => {
  return (
    <BottomSheet>
      <BottomSheetTrigger>
        <Pressable
          onPress={() => onSelect(value)}
          className='flex-1 flex-row items-center justify-between h-16 px-3 bg-info-background'
        >
          <Box className='flex-1 items-center justify-center'>
            <Icon name={value} />
          </Box>
          <Icon name='arrow-down' />
        </Pressable>
      </BottomSheetTrigger>
      <BottomSheetPortal
        snapPoints={['25%', '50%']}
        backdropComponent={BottomSheetBackdrop}
        handleComponent={BottomSheetDragIndicator}
      >
        <BottomSheetContent>
          <Grid className='gap-4' _extra={{ className: 'grid-cols-3' }}>
            <GridItem _extra={{ className: 'col-span-1' }}>
              <Pressable onPress={() => onSelect('entertainment')}>
                <Icon name='entertainment' />
              </Pressable>
            </GridItem>
            <GridItem _extra={{ className: 'col-span-1' }}>
              <Pressable onPress={() => onSelect('shop')}>
                <Icon name='shop' />
              </Pressable>
            </GridItem>
            <GridItem _extra={{ className: 'col-span-1' }}>
              <Pressable onPress={() => onSelect('bank')}>
                <Icon name='bank' />
              </Pressable>
            </GridItem>
            <GridItem _extra={{ className: 'col-span-1' }}>
              <Pressable onPress={() => onSelect('food')}>
                <Icon name='food' />
              </Pressable>
            </GridItem>
            <GridItem _extra={{ className: 'col-span-1' }}>
              <Pressable onPress={() => onSelect('health')}>
                <Icon name='health' />
              </Pressable>
            </GridItem>
            <GridItem _extra={{ className: 'col-span-1' }}>
              <Pressable onPress={() => onSelect('education')}>
                <Icon name='education' />
              </Pressable>
            </GridItem>
            <GridItem _extra={{ className: 'col-span-1' }}>
              <Pressable onPress={() => onSelect('travel')}>
                <Icon name='travel' />
              </Pressable>
            </GridItem>
            <GridItem _extra={{ className: 'col-span-1' }}>
              <Pressable onPress={() => onSelect('service')}>
                <Icon name='service' />
              </Pressable>
            </GridItem>
            <GridItem _extra={{ className: 'col-span-1' }}>
              <Pressable onPress={() => onSelect('social-media')}>
                <Icon name='social-media' />
              </Pressable>
            </GridItem>
          </Grid>
        </BottomSheetContent>
      </BottomSheetPortal>
    </BottomSheet>
  )
}
