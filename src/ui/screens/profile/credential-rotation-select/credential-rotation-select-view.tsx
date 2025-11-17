import { Select } from '@/ui/components/select'

type Props = {
  value: number
  options: string[]
  onChange: (value: number) => void
}

export const CredentialRotationSelectView = ({ value, onChange }: Props) => {
  return (
    <Select
      label='Tempo máximo sem atualização de credencial'
      value={ROTATION_OPTIONS[ROTATION_OPTIONS.length - value]}
      options={ROTATION_OPTIONS}
      onChange={(value) =>
        onChange(ROTATION_OPTIONS.length - ROTATION_OPTIONS.indexOf(value))
      }
    />
  )
}
