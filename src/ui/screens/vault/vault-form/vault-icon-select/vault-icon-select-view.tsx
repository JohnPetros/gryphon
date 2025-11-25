import { COLORS } from '@/constants'
import { RefObject, useCallback, useRef } from 'react'
import { Alert, StyleSheet } from 'react-native'

import type { VaultIcon } from '@/core/domain/types'

import { Icon } from '@/ui/components/icon'
import { Pressable } from '@/ui/components/pressable'
import { Box } from '@/ui/gluestack/box'
import { Grid, GridItem } from '@/ui/gluestack/grid'
import { Text } from '@/ui/gluestack/text'
import { BottomSheet } from '@/ui/components/bottom-sheet'
import type { BottomSheetRef } from '@/ui/components/bottom-sheet/types'
import type { Theme } from '@/ui/contexts/theme-context/types'

const ICONS: VaultIcon[] = [
  'entertainment',
  'shop',
  'bank',
  'food',
  'health',
  'education',
  'travel',
  'service',
  'social-media',
  'streaming',
]

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

type Props = {
  value: VaultIcon
  theme: Theme
  bottomSheetRef: RefObject<BottomSheetRef | null>
  onChange: (icon: VaultIcon) => void
}

export const IconSelectView = ({ value, theme, bottomSheetRef, onChange }: Props) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      trigger={
        <Box className='w-40 flex-row items-center justify-between px-3 h-16 bg-info-background'>
          <Box className='flex-1 items-center justify-center translate-x-1'>
            <Icon name={value} color='info' size={24} />
          </Box>
          <Icon name='arrow-down' color='info' />
        </Box>
      }
    >
      <Text className='text-lg font-bold text-center mb-6'>Escolha um ícone</Text>
      <Grid
        className='gap-y-8 items-center justify-center'
        _extra={{ className: 'grid-cols-5' }}
      >
        {ICONS.map((icon) => {
          const isSelected = value === icon
          return (
            <GridItem
              key={icon}
              className='bg-background-50 rounded-md items-center justify-center'
              _extra={{ className: 'col-span-1' }}
            >
              <Pressable
                onPress={() => onChange(icon)}
                style={{
                  ...styles.icon,
                  backgroundColor: isSelected
                    ? COLORS[theme].primary
                    : COLORS[theme].surface,
                }}
              >
                <Icon name={icon} color={isSelected ? 'background' : 'accent'} />
              </Pressable>
            </GridItem>
          )
        })}
      </Grid>
    </BottomSheet>
  )
}
