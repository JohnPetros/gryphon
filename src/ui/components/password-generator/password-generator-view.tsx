import type { PropsWithChildren } from 'react'

import { Box } from '@/ui/gluestack/box'

import type { Password } from '@/core/domain/structures'
import { PasswordInput } from './password-input'
import { BottomSheet } from '../bottom-sheet'
import { Button } from '../button'
import { Text } from '@/ui/gluestack/text'
import { CharacterLengthInput } from './character-length-input'
import { Checkbox } from '../checkbox'

type Props = {
  password: Password
  characterLength: number
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumbers: boolean
  hasSpecialChar: boolean
  onReload: () => void
  onChange: (value: string) => void
  onChangeCharacterLength: (value: number) => void
  onChangeHasUppercase: (value: boolean) => void
  onChangeHasLowercase: (value: boolean) => void
  onChangeHasNumbers: (value: boolean) => void
  onChangeHasSpecialChar: (value: boolean) => void
  onConfirm?: () => void
}

export const PasswordGeneratorView = ({
  children,
  password,
  characterLength,
  hasUppercase,
  hasLowercase,
  hasNumbers,
  hasSpecialChar,
  onReload,
  onChange,
  onChangeCharacterLength,
  onChangeHasUppercase,
  onChangeHasLowercase,
  onChangeHasNumbers,
  onChangeHasSpecialChar,
  onConfirm,
}: PropsWithChildren<Props>) => {
  return (
    <BottomSheet
      trigger={children}
      snapPoints={['75%', '90%']}
      backgroundColor='background'
    >
      <Box className='flex-1 h-full'>
        <Text className='text-xl font-bold text-center text-neutral mt-3 mb-6'>
          Gerador de senha
        </Text>

        <Box className='flex-col gap-6 px-6'>
          <PasswordInput value={password.value} onReload={onReload} onChange={onChange} />
          <Box className='flex-col gap-8 p-6 bg-black'>
            <CharacterLengthInput
              value={characterLength}
              onChange={onChangeCharacterLength}
            />

            <Box className='flex-col gap-4'>
              <Checkbox isChecked={hasUppercase} onChange={onChangeHasUppercase}>
                Incluir letras maiúsculas
              </Checkbox>
              <Checkbox isChecked={hasLowercase} onChange={onChangeHasLowercase}>
                Incluir letras minúsculas
              </Checkbox>
              <Checkbox isChecked={hasNumbers} onChange={onChangeHasNumbers}>
                Incluir letras números
              </Checkbox>
              <Checkbox isChecked={hasSpecialChar} onChange={onChangeHasSpecialChar}>
                Incluir caracteres especiais
              </Checkbox>
            </Box>
          </Box>
        </Box>
        {onConfirm && <Button onPress={onConfirm}>Confirmar</Button>}
      </Box>
    </BottomSheet>
  )
}
