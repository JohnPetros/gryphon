import { Text } from '@/ui/gluestack/text'

type Props = {
  children: React.ReactNode
}

export const ScreenTitleView = ({ children }: Props) => {
  return <Text className='text-2xl font-bold'>{children}</Text>
}
