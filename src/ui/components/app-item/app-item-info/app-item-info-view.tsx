import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

type Props = {
  name: string
  description: string
  className?: string
}

export const AppItemInfoView = ({ name, description, className }: Props) => {
  return (
    <Box className={className}>
      <Text numberOfLines={1} ellipsizeMode='tail' className='text-md text-accent'>
        {name}
      </Text>
      <Text isTruncated className='text-sm text-neutral'>
        {description}
      </Text>
    </Box>
  )
}
