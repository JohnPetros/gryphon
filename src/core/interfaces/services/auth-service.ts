import type { AccountDto } from '@/core/domain/entities/dtos'
import type { Id } from '@/core/domain/structures'
import type { RestResponse } from '@/core/responses'

export interface AuthService {
  fetchAccount(accountId: Id): Promise<RestResponse<AccountDto>>
}
