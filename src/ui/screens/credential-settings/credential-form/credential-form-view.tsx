import { Controller } from 'react-hook-form'

import type { CryptoProvider } from '@/core/interfaces'
import type { Credential } from '@/core/domain/entities'

import { Box } from '@/ui/gluestack/box'
import { Input } from '@/ui/components/input'
import { Button } from '@/ui/components/button'
import { PasswordInput } from '@/ui/components/password-input'
import { useCredentialForm } from './use-credential-form'
import { VaultSelect } from './vault-select'
import { KeyboardAvoidingView } from 'react-native'

type Params = {
  credential: Credential | null
  cryptoProvider: CryptoProvider
  encryptionKey: string
  minimumPasswordStrength: number
  onCreate: (credential: Credential) => Promise<void>
  onUpdate: (credential: Credential) => Promise<void>
}

export const CredentialFormView = ({
  credential,
  cryptoProvider,
  encryptionKey,
  minimumPasswordStrength,
  onCreate,
  onUpdate,
}: Params) => {
  const { isSubmitting, isValid, control, handleSubmit } = useCredentialForm({
    credential,
    cryptoProvider,
    encryptionKey,
    minimumPasswordStrength,
    onCreate,
    onUpdate,
  })

  return (
    <Box className='flex flex-col gap-2'>
      <Box className='flex flex-row gap-2'>
        <Controller
          control={control}
          name='vaultId'
          render={({ field }) => (
            <VaultSelect defaultValue={field.value} onChange={field.onChange} />
          )}
        />

        <Button
          onPress={handleSubmit}
          className='w-32 items-center justify-center'
          isDisabled={!isValid}
          isLoading={isSubmitting}
        >
          {credential ? 'Editar' : 'Criar'}
        </Button>
      </Box>
      <KeyboardAvoidingView>
        <Box className='gap-3 mt-6'>
          <Controller
            control={control}
            name='title'
            render={({ field }) => (
              <Input
                label='Título'
                icon='title'
                placeholder='Sem título'
                defaultValue={field.value}
                isRequired
                hasCapitalize
                onChange={field.onChange}
              />
            )}
          />

          <Box>
            <Controller
              control={control}
              name='login'
              render={({ field }) => (
                <Input
                  label='Login'
                  icon='login'
                  placeholder='Login'
                  defaultValue={field.value}
                  isRequired
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              render={({ field }) => (
                <PasswordInput
                  label='Senha'
                  hasStrength
                  defaultValue={field.value}
                  isRequired
                  hasPasswordGenerator={Boolean(credential)}
                  onChange={field.onChange}
                />
              )}
            />
          </Box>

          <Controller
            control={control}
            name='siteUrl'
            render={({ field }) => (
              <Input
                label='Site'
                icon='link'
                placeholder='https://www.google.com'
                defaultValue={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Box>
      </KeyboardAvoidingView>
    </Box>
  )
}
