import { Controller } from 'react-hook-form'

import type { Vault } from '@/core/domain/entities'
import type { VaultIcon } from '@/core/domain/types'

import { Box } from '@/ui/gluestack/box'
import { Input } from '@/ui/components/input'
import { Button } from '@/ui/components/button'
import { VaultIconSelect } from './vault-icon-select'
import { useVaultForm } from './use-vault-form'

type Props = {
  vault: Vault | null
  onCreate: (vault: Vault) => Promise<void>
  onUpdate: (vault: Vault) => Promise<void>
}

export const VaultFormView = ({ vault, onCreate, onUpdate }: Props) => {
  const { isSubmitting, isValid, control, handleSubmit } = useVaultForm({
    vault,
    onCreate,
    onUpdate,
  })

  return (
    <Box className='flex flex-col gap-6'>
      <Box className='flex flex-row gap-2'>
        <VaultIconSelect value={vault?.icon} onSelect={() => {}} />
        <Button
          onPress={handleSubmit}
          isDisabled={!isValid}
          isLoading={isSubmitting}
          className='w-32 items-center justify-center'
        >
          Criar
        </Button>
      </Box>

      <Controller
        control={control}
        name='title'
        render={({ field }) => (
          <Input
            label='Título'
            icon='title'
            placeholder='Sem título'
            onChange={field.onChange}
          />
        )}
      />
    </Box>
  )
}
