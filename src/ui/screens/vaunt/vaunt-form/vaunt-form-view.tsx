import { Controller } from 'react-hook-form'

import type { vault } from '@/core/domain/entities'

import { Box } from '@/ui/gluestack/box'
import { Input } from '@/ui/components/input'
import { Button } from '@/ui/components/button'
import { IconSelect } from './icon-select'
import { usevaultForm } from './use-vault-form'

type Props = {
  vault: vault | null
  onCreate: (vault: vault) => Promise<void>
  onUpdate: (vault: vault) => Promise<void>
}

export const vaultFormView = ({ vault, onCreate, onUpdate }: Props) => {
  const { isSubmitting, isValid, control, handleSubmit } = usevaultForm({
    vault,
    onCreate,
    onUpdate,
  })

  return (
    <Box>
      <Box className='flex flex-row gap-2'>
        <IconSelect />
        <Button onPress={handleSubmit} isDisabled={!isValid} isLoading={isSubmitting}>
          Criar
        </Button>
      </Box>

      <Controller
        control={control}
        name='title'
        render={({ field }) => (
          <Input label='Título' icon='title' onChange={field.onChange} />
        )}
      />
    </Box>
  )
}
