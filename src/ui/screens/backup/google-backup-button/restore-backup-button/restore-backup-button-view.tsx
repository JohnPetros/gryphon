import type { RefObject } from 'react'

import { Pressable } from '@/ui/components/pressable'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { Icon } from '@/ui/components/icon'
import { MasterPasswordConfirmationDialog } from '@/ui/components/master-password-confirmation-dialog'
import type { MasterPasswordConfirmationDialogRef } from '@/ui/components/master-password-confirmation-dialog/types'
import { LoadingDialog } from '@/ui/components/loading-dialog'

type Props = {
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  isRestoring: boolean
  onPress: () => void
  onCorrectMasterPasswordSubmit: () => Promise<void>
}

export const RestoreBackupButtonView = ({
  isRestoring,
  masterPasswordConfirmationDialogRef,
  onPress,
  onCorrectMasterPasswordSubmit,
}: Props) => {
  return (
    <>
      <LoadingDialog isOpen={isRestoring} message='Restaurando seu último backup...' />
      <MasterPasswordConfirmationDialog
        ref={masterPasswordConfirmationDialogRef}
        description='Insira a senha mestra para poder copiar a senha.'
        canClose
        onCorrectPasswordSubmit={onCorrectMasterPasswordSubmit}
      />
      <Pressable onPress={onPress}>
        <Box className='rounded-md border border-accent px-6 py-3'>
          <Box className='flex-row items-center gap-3'>
            <Icon name='restoration' color='accent' size={20} />
            <Text className='text-accent text-xl'>Restaurar Último Backup</Text>
          </Box>
        </Box>
      </Pressable>
    </>
  )
}
