import { AppItem } from '@/ui/components/app-item'
import { Box } from '@/ui/gluestack/box'
import { Image } from '@/ui/gluestack/image'
import { mergeClassNames } from '@/ui/utils'

type Props = {
  siteUrl: string | null
  hasError: boolean
  className?: string
  onError: () => void
}

export const CredentialIconView = ({ siteUrl, hasError, className, onError }: Props) => {
  if (!siteUrl || hasError) {
    return (
      <AppItem.Icon
        backgroundColor='primaryBackground'
        foregroundColor='primary'
        size={32}
        className={mergeClassNames('w-20 h-20', className)}
        name='login'
      />
    )
  }

  return (
    <Box
      className={mergeClassNames(
        'bg-white w-20 h-20 items-center justify-center rounded-md',
        className,
      )}
    >
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
