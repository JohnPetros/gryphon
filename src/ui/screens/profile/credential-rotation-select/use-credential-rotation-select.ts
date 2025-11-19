import type { Account } from '@/core/domain/entities'
import type { CredentialRotationDto } from '@/core/domain/entities/dtos/credential-rotation-dto'
import { CredentialRotation } from '@/core/domain/structures'

const ROTATION_OPTIONS: Record<string, CredentialRotationDto> = {
  '1 semana': {
    unit: 'week',
    interval: 1,
  },
  '1 mês': {
    unit: 'month',
    interval: 1,
  },
  '3 meses': {
    unit: 'month',
    interval: 3,
  },
  '6 meses': {
    unit: 'month',
    interval: 6,
  },
  '1 ano': {
    unit: 'year',
    interval: 1,
  },
}

type Params = {
  account: Account | null
  onUpdateAccount: (account: Account) => Promise<void>
}

export const useCredentialRotationSelect = ({ account, onUpdateAccount }: Params) => {
  async function handleChange(value: string) {
    if (!account) return
    const rotationDto = ROTATION_OPTIONS[value]
    account.credentialRotation = CredentialRotation.create(
      rotationDto.unit,
      rotationDto.interval,
    )
    await onUpdateAccount(account)
  }

  const options = Object.keys(ROTATION_OPTIONS)
  const selectedOption = Object.entries(ROTATION_OPTIONS).find(
    (option) =>
      option[1].unit === account?.credentialRotation.unit &&
      option[1].interval === account?.credentialRotation.interval,
  )?.[0]

  return {
    selectedOption,
    options,
    handleChange,
  }
}
