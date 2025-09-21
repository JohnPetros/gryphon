import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { mergeClassNames } from '@/ui/utils'

type Props = {
  name: string
  description: string
  className?: string
}

export const AppItemInfoView = ({ name, description, className }: Props) => {
  return (
    <Box className={mergeClassNames(className)}>
      <Text numberOfLines={1} ellipsizeMode='tail' className='text-md text-accent'>
        {name}
      </Text>
      <Text numberOfLines={1} ellipsizeMode='tail' className='text-sm text-neutral'>
        {description}
      </Text>
    </Box>
  )
}
