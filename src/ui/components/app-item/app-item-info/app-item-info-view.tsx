import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { mergeClassNames } from '@/ui/utils'

type Props = {
  name: string
  description: string
  lineCount?: number
  className?: string
}

export const AppItemInfoView = ({
  name,
  description,
  lineCount = 1,
  className,
}: Props) => {
  return (
    <Box className={mergeClassNames(className)}>
      <Text
        numberOfLines={lineCount}
        ellipsizeMode='tail'
        className='text-md text-accent'
      >
        {name}
      </Text>
      <Text
        numberOfLines={lineCount}
        ellipsizeMode='tail'
        className='text-sm text-neutral'
      >
        {description}
      </Text>
    </Box>
  )
}
