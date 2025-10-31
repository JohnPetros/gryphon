import { ScrollView } from 'react-native'

import { Box } from '@/ui/gluestack/box'
import { Skeleton } from '@/ui/gluestack/skeleton'

const TAB_PLACEHOLDERS = Array.from({ length: 2 })
const ITEM_PLACEHOLDERS = Array.from({ length: 4 })

export const ItensListSkeletonView = () => {
  return (
    <Box>
      <ScrollView horizontal contentContainerStyle={{ gap: 12 }}>
        {TAB_PLACEHOLDERS.map((_, index) => (
          <Skeleton
            key={`vault-items-skeleton-tab-${index}`}
            className='h-14 w-32 rounded-lg'
          />
        ))}
      </ScrollView>

      <Box className='mt-6 gap-3'>
        {ITEM_PLACEHOLDERS.map((_, index) => (
          <Box
            key={`vault-items-skeleton-item-${index}`}
            className='flex-row items-center justify-between rounded-2xl border border-neutral-background p-4'
          >
            <Box className='flex-row items-center gap-3'>
              <Skeleton className='h-12 w-12 rounded-full' />

              <Box className='gap-2'>
                <Skeleton className='h-4 w-32 rounded-md' />
                <Skeleton className='h-4 w-44 rounded-md' />
              </Box>
            </Box>

            <Skeleton className='h-6 w-6 rounded-md' />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
