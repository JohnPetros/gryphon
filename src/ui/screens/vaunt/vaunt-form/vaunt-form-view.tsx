import { Controller } from 'react-hook-form'

import type { Vaunt } from '@/core/domain/entities'

import { Box } from '@/ui/gluestack/box'
import { Input } from '@/ui/components/input'
import { Button } from '@/ui/components/button'
import { IconSelect } from './icon-select'
import { useVauntForm } from './use-vaunt-form'

type Props = {
  vaunt: Vaunt | null
  onCreate: (vaunt: Vaunt) => Promise<void>
  onUpdate: (vaunt: Vaunt) => Promise<void>
}

export const VauntFormView = ({ vaunt, onCreate, onUpdate }: Props) => {
  const { isSubmitting, isValid, control, handleSubmit } = useVauntForm({
    vaunt,
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
