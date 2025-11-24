import type { RestClient } from '@/core/interfaces'
import type { NotificationService as INotificationService } from '@/core/interfaces/services'
import type { Id } from '@/core/domain/structures'

export const NotificationService = (restClient: RestClient): INotificationService => {
  return {
    async sendNotification(accountId: Id, title: string, message: string, route: string) {
      return await restClient.post(`/notifications/${accountId.value}`, {
        title,
        message,
        route,
      })
    },
  }
}
