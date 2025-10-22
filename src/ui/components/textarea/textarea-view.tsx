import type { RefObject } from 'react'

import { Textarea, TextareaInput } from '@/ui/gluestack/textarea'
import { mergeClassNames } from '@/ui/utils/merge-class-names'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { Icon } from '@/ui/components/icon'
import type { IconName } from '../icon/types'
import { MasterPasswordConfirmationDialog } from '../master-password-confirmation-dialog'
import { Pressable } from '../pressable'
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
  masterPasswordConfirmationDialogRef: RefObject<MasterPasswordConfirmationDialogRef | null>
  onChange: (value: string) => void
  onBlockPress: () => void
  onUnblockPress: () => void
  onCorrectMasterPasswordConfirmationDialogSubmit: () => void
}

export const TextareaView = ({
  masterPasswordConfirmationDialogRef,
  className,
  placeholder,
  label,
  icon,
  value,
  defaultValue,
  isRequired,
  isBlocked,
  isReadOnly,
  onChange,
  onBlockPress,
  onUnblockPress,
  onCorrectMasterPasswordConfirmationDialogSubmit,
}: Props) => {
  return (
    <>
      <MasterPasswordConfirmationDialog
        ref={masterPasswordConfirmationDialogRef}
        description='Insira a senha mestra para poder ver a senha da sua credencial.'
        canClose
        onCorrectPasswordSubmit={onCorrectMasterPasswordConfirmationDialogSubmit}
      />
      <Textarea
        size='md'
        isReadOnly={isReadOnly || isBlocked}
        isInvalid={false}
        isDisabled={false}
        className={mergeClassNames(
          'relative h-64 px-4 bg-surface border-neutral-background border-[0.5px]',
          className,
        )}
      >
        <Box className='flex flex-row gap-2 pt-4'>
          <Box className='pl-3'>
            <Icon name={icon} color='neutral' size={24} />
          </Box>
          {label && (
            <Box>
              <Box className='flex-row gap-1'>
                <Text>{label}</Text>
                {isRequired && <Text className='-translate-y-1 text-sm'>*</Text>}
              </Box>
            </Box>
          )}
        </Box>
        {isBlocked && (
          <Pressable
            onPress={onBlockPress}
            className='absolute top-0 left-0 bottom-0 right-0 flex flex-row items-center justify-center gap-2 bg-black/50'
          >
            <Icon name='lock' color='neutral' size={40} />
          </Pressable>
        )}
        <TextareaInput
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={isBlocked ? '' : (value ?? defaultValue ?? undefined)}
          className='pl-4 text-xl'
          onChangeText={onChange}
        />
        {!isBlocked && (
          <Pressable
            onPress={onUnblockPress}
            className='absolute bottom-4 right-4 flex flex-row items-center justify-center gap-2'
          >
            <Icon name='lock' color='neutral' size={24} />
          </Pressable>
        )}
      </Textarea>
    </>
  )
}
