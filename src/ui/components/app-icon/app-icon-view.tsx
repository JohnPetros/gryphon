import { Image } from '@/ui/gluestack/image'
import AppIcon from '@/assets/images/app-icon.png'

type Props = {
  size: 'sm' | 'md' | 'lg' | 'xl'
}

export const AppIconView = ({ size }: Props) => {
  return <Image source={AppIcon} size={size} alt='Gryphon' />
}
