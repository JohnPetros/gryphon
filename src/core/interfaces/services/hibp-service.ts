import type { RestResponse } from '@/core/responses'

export interface HibpService {
  getPasswords(passwordHash: string): Promise<RestResponse<string[]>>
}
