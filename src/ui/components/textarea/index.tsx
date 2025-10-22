import { useRef } from 'react'

import { TextareaView } from './textarea-view'
import { useTextarea } from './use-textarea'
import type { IconName } from '../icon/types'
import type { MasterPasswordConfirmationDialogRef } from '../master-password-confirmation-dialog/types'

type Props = {
  label?: string
  icon: IconName
  value?: string
  defaultValue?: string
  className?: string
  isRequired?: boolean
  isReadOnly?: boolean
  placeholder?: string
  isBlocked?: boolean
  onChange: (value: string) => void
}

export const Textarea = ({
  label,
  icon,
  value,
  defaultValue,
  className,
  isRequired,
  isReadOnly,
  isBlocked: isDefaultBlocked = false,
  placeholder,
  onChange,
}: Props) => {
  const masterPasswordConfirmationDialogRef =
    useRef<MasterPasswordConfirmationDialogRef | null>(null)
  const {
    isBlocked,
    handleBlockPress,
    handleUnblockPress,
    handleCorrectMasterPasswordConfirmationDialogSubmit,
  } = useTextarea({
    isDefaultBlocked,
    masterPasswordConfirmationDialogRef,
  })
  return (
    <TextareaView
      label={label}
      icon={icon}
      value={value}
      defaultValue={defaultValue}
      isRequired={isRequired}
      className={className}
      placeholder={placeholder}
      isBlocked={isBlocked}
      masterPasswordConfirmationDialogRef={masterPasswordConfirmationDialogRef}
      onChange={onChange}
      onBlockPress={handleBlockPress}
      onUnblockPress={handleUnblockPress}
      onCorrectMasterPasswordConfirmationDialogSubmit={
        handleCorrectMasterPasswordConfirmationDialogSubmit
      }
    />
  )
}
