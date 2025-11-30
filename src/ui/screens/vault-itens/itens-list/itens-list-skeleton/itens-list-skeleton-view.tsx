import { Box } from '@/ui/gluestack/box'
import { Skeleton } from '@/ui/gluestack/skeleton'

const ITEM_PLACEHOLDERS = Array.from({ length: 5 })

export const ItensListSkeletonView = () => {
  return (
    <Box>
      <Box className='mt-6 gap-3'>
        {ITEM_PLACEHOLDERS.map((_, index) => (
          <Box
            key={`vault-items-skeleton-item-${index}`}
            className='flex-row items-center justify-between rounded-2xl'
          >
            <Box className='flex-row items-center gap-3'>
              <Skeleton className='h-16 w-16 rounded-md animate-pulse bg-neutral-background' />

              <Box className='gap-2'>
                <Skeleton className='h-4 w-32 animate-pulse bg-neutral-background rounded-md' />
                <Skeleton className='h-4 w-44 animate-pulse bg-neutral-background rounded-md' />
              </Box>
            </Box>

            <Skeleton className='h-6 w-6 rounded-md' />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
