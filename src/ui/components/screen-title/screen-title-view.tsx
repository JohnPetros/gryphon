import { Text } from '@/ui/gluestack/text'

type Props = {
  children: string
}

export const ScreenTitleView = ({ children }: Props) => {
  return <Text className='text-2xl font-bold'>{children}</Text>
}
