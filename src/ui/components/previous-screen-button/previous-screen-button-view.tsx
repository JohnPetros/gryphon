import { Button } from '@/ui/gluestack/button'
import { Icon } from '../icon'

type Props = {
  onPress: () => void
}

export const PreviousScreenButtonView = ({ onPress }: Props) => {
  return (
    <Button
      variant='outline'
      className='border-primary w-10 h-10 items-center justify-center'
      onPress={onPress}
    >
      <Icon name='arrow-left' color='primary' />
    </Button>
  )
}
