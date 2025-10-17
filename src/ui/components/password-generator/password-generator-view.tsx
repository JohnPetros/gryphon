import type { PropsWithChildren, RefObject } from 'react'

import type { Password } from '@/core/domain/structures'

import { mergeClassNames } from '@/ui/utils'
import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { PasswordInput } from './password-input'
import { BottomSheet } from '../bottom-sheet'
import { Button } from '../button'
import { LengthInput } from './length-input'
import { Checkbox } from '../checkbox'
import { PasswordStregth } from '../password-stregth'
import type { BottomSheetRef } from '../bottom-sheet/types'

const PASSWORD_STRENGTH_MESSAGES: Record<number, string> = {
  1: 'muito fraca',
  2: 'fraca',
  3: 'boa',
  4: 'forte',
  5: 'muito forte',
}

type Props = {
  password: Password
  bottomSheetRef: RefObject<BottomSheetRef | null>
  length: number
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumbers: boolean
  hasSymbols: boolean
  isInvalid: boolean
  minimumPasswordStrength: number
  onReload: () => void
  onChange: (value: string) => void
  onChangeLength: (value: number) => void
  onChangeHasUppercase: (value: boolean) => void
  onChangeHasLowercase: (value: boolean) => void
  onChangeHasNumbers: (value: boolean) => void
  onChangeSymbols: (value: boolean) => void
  onOpen: () => void
  onConfirm?: () => void
}

export const PasswordGeneratorView = ({
  children,
  password,
  bottomSheetRef,
  length,
  hasUppercase,
  hasLowercase,
  hasNumbers,
  hasSymbols,
  isInvalid,
  minimumPasswordStrength,
  onReload,
  onChange,
  onChangeLength,
  onChangeHasUppercase,
  onChangeHasLowercase,
  onChangeHasNumbers,
  onChangeSymbols,
  onOpen,
  onConfirm,
}: PropsWithChildren<Props>) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      trigger={children}
      snapPoints={['75%', '90%']}
      backgroundColor='background'
      onOpen={onOpen}
    >
      <Box className='flex-1'>
        <Text className='text-xl font-bold text-center text-neutral mt-3 mb-6'>
          Gerador de senha
        </Text>

        <Box className='flex-col gap-6 px-6'>
          <PasswordInput
            value={password.value}
            isInvalid={isInvalid}
            onReload={onReload}
            onChange={onChange}
          />
          <Box className='flex-col gap-8 p-6 bg-black'>
            <LengthInput value={length} isInvalid={isInvalid} onChange={onChangeLength} />

            <Box className='flex-col gap-4'>
              <Checkbox
                isChecked={hasUppercase}
                isInvalid={isInvalid}
                onChange={onChangeHasUppercase}
              >
                Incluir letras maiúsculas
              </Checkbox>
              <Checkbox
                isChecked={hasLowercase}
                isInvalid={isInvalid}
                onChange={onChangeHasLowercase}
              >
                Incluir letras minúsculas
              </Checkbox>
              <Checkbox
                isChecked={hasNumbers}
                isInvalid={isInvalid}
                onChange={onChangeHasNumbers}
              >
                Incluir números
              </Checkbox>
              <Checkbox
                isChecked={hasSymbols}
                isInvalid={isInvalid}
                onChange={onChangeSymbols}
              >
                Incluir caracteres especiais
              </Checkbox>
            </Box>
            <Box className='flex-row justify-between items-center'>
              <Text className='text-lg text-neutral'>Força</Text>
              <PasswordStregth password={password} isLarge />
            </Box>
          </Box>

         {onConfirm && <Text className='text-sm text-neutral mt-2'>Força mínima de senha: {PASSWORD_STRENGTH_MESSAGES[minimumPasswordStrength]}</Text>}

          {onConfirm && (
            <Button
              className={mergeClassNames('bg-primary', isInvalid && 'bg-danger')}
              onPress={onConfirm}
            >
              Confirmar
            </Button>
          )}
        </Box>
      </Box>
    </BottomSheet>
  )
}
