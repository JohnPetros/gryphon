import { Select } from '@/ui/components/select'

const STRENGTH_LEVELS = ['Muito forte', 'Forte', 'Boa', 'Fraca', 'Muito fraca']

type Props = {
  value: number
  onChange: (value: number) => void
}

export const MinimumPasswordStrenghSelectView = ({ value, onChange }: Props) => {
  return (
    <Select
      label='Força mínima de senhas'
      value={STRENGTH_LEVELS[STRENGTH_LEVELS.length - value]}
      options={STRENGTH_LEVELS}
      onChange={(value) =>
        onChange(STRENGTH_LEVELS.length - STRENGTH_LEVELS.indexOf(value))
      }
    />
  )
}
