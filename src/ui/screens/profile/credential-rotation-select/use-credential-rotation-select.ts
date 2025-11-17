import { Account } from '@/core/domain/entities'
import { CredentialRotationDto } from '@/core/domain/entities/dtos/credential-rotation-dto'
import { AccountsRepository } from '@/core/interfaces'
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
  accountsRepository: AccountsRepository
  account: Account | null
  updateAccount: (account: Account) => void
  onUpdateAccount: (account: Account) => Promise<void>
}

export const useCredentialRotationSelect = ({
  accountsRepository,
  account,
  updateAccount,
  onUpdateAccount,
}: Params) => {
  function handleChange(value: number) {
    const rotationDto = ROTATION_OPTIONS[value]
    account?.credentialRotation = CredentialRotation.create(rotationDto.unit, rotationDto.interval)
    console.log(value)
  }

  return {
    options: Object.keys(ROTATION_OPTIONS),
  }
}
