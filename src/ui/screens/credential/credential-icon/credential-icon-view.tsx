import { AppItem } from '@/ui/components/app-item'
import { Box } from '@/ui/gluestack/box'
import { Image } from '@/ui/gluestack/image'

type Props = {
  siteUrl: string | null
  hasError: boolean
  onError: () => void
}

export const CredentialIconView = ({ siteUrl, hasError, onError }: Props) => {
  if (!siteUrl || hasError) {
    return (
      <AppItem.Icon
        backgroundColor='primaryBackground'
        foregroundColor='primary'
        size={32}
        className='w-20 h-20'
        name='login'
      />
    )
  }

  return (
    <Box className='bg-white w-20 h-20 items-center justify-center rounded-md'>
      <Image
        source={{
          uri: siteUrl,
        }}
        size='xs'
        alt=''
        onError={onError}
      />
    </Box>
  )
}
