import { AlertDialogView } from './alert-dialog-view'
import { useAlertDialog } from './use-alert-dialog'

type Props = {
  children: string
  trigger: React.ReactNode
  onConfirm: () => void
}

export const AlertDialog = ({ children, trigger, onConfirm }: Props) => {
  const { isOpen, handleOpenButtonPress, handleConfirmButtonPress, handleClose } =
    useAlertDialog(onConfirm)

  return (
    <AlertDialogView
      trigger={trigger}
      isOpen={isOpen}
      onButtonConfirmPress={handleConfirmButtonPress}
      onClose={handleClose}
      onOpenButtonPress={handleOpenButtonPress}
    >
      {children}
    </AlertDialogView>
  )
}
