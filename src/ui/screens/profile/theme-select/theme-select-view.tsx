import { Select } from '@/ui/components/select'

type Props = {
  value: string
  options: string[]
  onChange: (value: string) => void
}

export const ThemeSelectView = ({ options, value, onChange }: Props) => {
  return <Select label='Tema' value={value} options={options} onChange={onChange} />
}
