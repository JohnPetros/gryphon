import { ActivityIndicator } from 'react-native'

import { COLORS } from '@/constants'
import { Heading } from '@/ui/gluestack/heading'
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@/ui/gluestack/modal'

type Props = {
  isOpen: boolean
  message: string
}

export const LoadingDialogView = ({ isOpen, message }: Props) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalBackdrop className='bg-black' />
      <ModalContent className='bg-black pt-6 pb-8'>
        <ModalHeader>
          <Heading>{message}</Heading>
        </ModalHeader>
        <ModalBody className='my-8'>
          <ActivityIndicator size='large' color={COLORS.dark.accent} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
