import type { RestResponse } from '@/core/responses'

export interface NotificationService {
  sendNotification(notificationToken: string, message: string): Promise<RestResponse>
}
