import { Controller } from 'react-hook-form'

import type { Vault } from '@/core/domain/entities'
import type { VaultDto } from '@/core/domain/entities/dtos'

import { Box } from '@/ui/gluestack/box'
import { Input } from '@/ui/components/input'
import { Button } from '@/ui/components/button'
import { IconSelect } from './vault-icon-select'
import { useVaultForm } from './use-vault-form'

type Props = {
  vault: Vault | null
  onCreate: (vault: VaultDto) => Promise<void>
  onUpdate: (vault: VaultDto) => Promise<void>
}

export const VaultFormView = ({ vault, onCreate, onUpdate }: Props) => {
  const { isSubmitting, isValid, isDirty, control, handleSubmit } = useVaultForm({
    vault,
    onCreate,
    onUpdate,
  })

  console.log({ isValid, isDirty })

  return (
    <Box className='flex flex-col gap-6'>
      <Box className='flex flex-row gap-2'>
        <Controller
          control={control}
          name='icon'
          render={({ field }) => (
            <IconSelect key={field.value} value={field.value} onChange={field.onChange} />
          )}
        />

        {vault && (
          <Button
            onPress={handleSubmit}
            isDisabled={vault ? !isDirty : !isValid}
            isLoading={isSubmitting}
            className='w-40 items-center justify-center'
          >
            Atualizar
          </Button>
        )}
        {!vault && (
          <Button
            onPress={handleSubmit}
            isDisabled={!isValid}
            isLoading={isSubmitting}
            className='w-40 items-center justify-center'
          >
            Criar
          </Button>
        )}
      </Box>

      <Controller
        control={control}
        name='title'
        render={({ field }) => (
          <Input
            label='Título'
            icon='title'
            placeholder='Sem título'
            defaultValue={vault?.title}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </Box>
  )
}
