import { Select } from '@/ui/components/select'
import { AUTO_LOCK_TIMEOUTS } from './use-auto-lock-timeout-select'

type Props = {
  timeout: number
  onChange: (timeoutIndex: number) => void
}

export const AutoLockTimeoutView = ({ timeout, onChange }: Props) => {
  return (
    <Select
      label='Bloqueio automático'
      value={AUTO_LOCK_TIMEOUTS[timeout]}
      options={Object.values(AUTO_LOCK_TIMEOUTS)}
      onChange={(timeoutLabel) =>
        onChange(Object.values(AUTO_LOCK_TIMEOUTS).indexOf(timeoutLabel))
      }
    />
  )
}
