import { Button, ButtonText } from '@/ui/gluestack/button'
import { Icon } from '../icon'

type Props = {
  onPress: () => Promise<void>
}

export const SignOutButtonView = ({ onPress }: Props) => {
  return (
    <Button variant='outline' onPress={onPress} className='border-accent h-16'>
      <Icon name='exit' color='accent' size={20} />
      <ButtonText className='text-accent text-md'>Encerrar sessão</ButtonText>
    </Button>
  )
}
