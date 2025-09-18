import { useState } from 'react'

export function useAlertDialog(onConfirm: () => void) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenButtonPress() {
    setIsOpen(true)
  }

  function handleClose() {
    setIsOpen(false)
  }

  function handleConfirmButtonPress() {
    onConfirm()
    setIsOpen(false)
  }

  return {
    isOpen,
    handleOpenButtonPress,
    handleConfirmButtonPress,
    handleClose,
  }
}
