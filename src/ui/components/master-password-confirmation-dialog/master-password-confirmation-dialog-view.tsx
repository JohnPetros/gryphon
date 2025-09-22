import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@/ui/gluestack/modal'
import { Heading } from '@/ui/gluestack/heading'
import { Text } from '@/ui/gluestack/text'
import { Input } from '../input'
import { Button } from '../button'
import { Icon } from '../icon'
import { Box } from '@/ui/gluestack/box'

type Props = {
  description: string
  isOpen: boolean
  canClose: boolean
  onClose: () => void
  onPasswordSubmit: () => void
  onPasswordChange: (value: string) => void
}

export const MasterPasswordConfirmationDialogView = ({
  isOpen,
  description,
  canClose,
  onClose,
  onPasswordSubmit,
  onPasswordChange,
}: Props) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalBackdrop className='bg-black' />
      <ModalContent className='bg-black pt-6 pb-8'>
        <ModalHeader className='flex-col items-end'>
          {canClose && (
            <ModalCloseButton onPress={onClose} className='p-2'>
              <Icon name='close' size={20} />
            </ModalCloseButton>
          )}

          <Box>
            <Heading>Sua senha mestra</Heading>
            <Text size='sm mt-2'>{description}</Text>
          </Box>
        </ModalHeader>
        <ModalBody className='my-8'>
          <Input
            type='number'
            icon='password'
            label='Senha mestra'
            placeholder='********'
            onChange={onPasswordChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={onPasswordSubmit}>Enviar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
