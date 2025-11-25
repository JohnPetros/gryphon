import { Select } from '@/ui/components/select'

type Props = {
  value: string
  options: string[]
  onChange: (value: string) => void
}

export const CredentialRotationSelectView = ({ value, options, onChange }: Props) => {
  return (
    <Select
      label='Tempo máximo sem atualização de credencial'
      value={value}
      options={options}
      onChange={onChange}
    />
  )
}
