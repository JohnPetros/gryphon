import { Controller } from 'react-hook-form'

import type { CryptoProvider } from '@/core/interfaces'
import type { Credential } from '@/core/domain/entities'

import { Box } from '@/ui/gluestack/box'
import { Input } from '@/ui/components/input'
import { Button } from '@/ui/components/button'
import { PasswordInput } from '@/ui/components/password-input'
import { useCredentialForm } from './use-credential-form'
import { vaultSelect } from './vault-select'

type Params = {
  credential: Credential | null
  cryptoProvider: CryptoProvider
  encryptionKey: string
  onCreate: (credential: Credential) => Promise<void>
  onUpdate: (credential: Credential) => Promise<void>
}

export const CredentialFormView = ({
  credential,
  cryptoProvider,
  encryptionKey,
  onCreate,
  onUpdate,
}: Params) => {
  const { isSubmitting, isValid, control, handleSubmit } = useCredentialForm({
    credential,
    cryptoProvider,
    encryptionKey,
    onCreate,
    onUpdate,
  })

  return (
    <Box className='flex flex-col gap-2'>
      <Box className='flex flex-row gap-2'>
        <vaultSelect />
        <Button
          onPress={handleSubmit}
          className='w-32 items-center justify-center'
          isDisabled={!isValid}
          isLoading={isSubmitting}
        >
          Criar
        </Button>
      </Box>
      <Box>
        <Box className='gap-3 mt-6'>
          {!credential && (
            <Controller
              control={control}
              name='title'
              render={({ field }) => (
                <Input
                  label='Títul'
                  icon='title'
                  placeholder='Sem título'
                  onChange={field.onChange}
                />
              )}
            />
          )}

          <Box>
            <Controller
              control={control}
              name='login'
              render={({ field }) => (
                <Input
                  label='Login'
                  icon='title'
                  placeholder='Login'
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              render={({ field }) => (
                <PasswordInput label='Senha' hasStrength onChange={field.onChange} />
              )}
            />
          </Box>

          <Controller
            control={control}
            name='siteUrl'
            render={({ field }) => (
              <Input
                label='Site'
                icon='title'
                placeholder='Nome'
                onChange={field.onChange}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  )
}
