import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from '@/ui/gluestack/alert-dialog'
import { Button, ButtonText } from '@/ui/gluestack/button'
import { Text } from '@/ui/gluestack/text'
import { Heading } from '@/ui/gluestack/heading'
import { Pressable } from '../pressable'

type Props = {
  children: string
  isOpen: boolean
  trigger: React.ReactNode
  onClose: () => void
  onButtonConfirmPress: () => void
  onOpenButtonPress: () => void
}

export const AlertDialogView = ({
  children,
  isOpen,
  trigger,
  onButtonConfirmPress,
  onClose,
  onOpenButtonPress,
}: Props) => {
  return (
    <>
      <Pressable onPress={onOpenButtonPress}>{trigger}</Pressable>
      <AlertDialog isOpen={isOpen} onClose={onClose} size='md'>
        <AlertDialogBackdrop className='bg-black' />
        <AlertDialogContent className='bg-background'>
          <AlertDialogHeader>
            <Heading className='text-lg text-danger font-semibold' size='md'>
              Você tem certeza que desaja fazer isso?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className='mt-3 mb-4'>
            <Text size='sm'>{children}</Text>
          </AlertDialogBody>
          <AlertDialogFooter className=''>
            <Button variant='outline' action='secondary' size='sm' onPress={onClose}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button size='sm' onPress={onButtonConfirmPress}>
              <ButtonText>Confirmar</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
