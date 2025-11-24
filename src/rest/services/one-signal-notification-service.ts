import { CLIENT_ENV } from '@/constants/client-env'
import { SERVER_ENV } from '@/constants/server-env'
import { RestResponse } from '@/core/responses'
import type { Id } from '@/core/domain/structures'
import type { NotificationService as INotificationService } from '@/core/interfaces/services'

export const OneSignalNotificationService = (): INotificationService => {
  return {
    async sendNotification(userId: Id, title: string, message: string, route: string) {
      const response = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${SERVER_ENV.oneSignalApiKey}`,
        },
        body: JSON.stringify({
          app_id: CLIENT_ENV.oneSignalAppId,
          include_aliases: {
            external_id: [userId.value],
          },
          target_channel: 'push',
          contents: {
            en: message,
            pt: message,
          },
          headings: {
            en: title,
            pt: title,
          },
          url: `gryphon:/${route}`,
        }),
      })
      if (!response.ok) {
        return new RestResponse({
          errorMessage: response.statusText,
          statusCode: response.status,
        })
      }
      return new RestResponse()
    },
  }
}
