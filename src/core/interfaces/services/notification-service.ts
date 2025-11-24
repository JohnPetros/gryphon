import type { Id } from '@/core/domain/structures'
import type { RestResponse } from '@/core/responses'

export interface NotificationService {
  sendNotification(
    accountId: Id,
    title: string,
    message: string,
    route: string,
  ): Promise<RestResponse>
}
