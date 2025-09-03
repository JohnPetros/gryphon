import type { PropsWithChildren } from 'react'

import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from '@/ui/gluestack/button'
import { COLORS } from '@/constants'

type Props = {
  isLoading?: boolean
  isDisabled?: boolean
  onPress: () => void
}

export const ButtonView = ({
  children,
  isLoading = false,
  isDisabled = false,
  onPress,
}: PropsWithChildren<Props>) => {
  return (
    <ButtonGroup>
      <Button isDisabled={isDisabled} onPress={onPress} className='bg-primary h-16'>
        {!isLoading && (
          <ButtonText className='text-xl font-bold uppercase'>{children}</ButtonText>
        )}
        {isLoading && <ButtonSpinner color={COLORS.dark.background} size='large' />}
        <ButtonIcon />
      </Button>
    </ButtonGroup>
  )
}
