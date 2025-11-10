import type { NotificationService as INotificationService } from '@/core/interfaces/services'

import { SERVER_ENV } from '@/constants/server-env'
import { RestResponse } from '@/core/responses'

export const NotificationService = (): INotificationService => {
  return {
    async sendNotification(notificationToken: string, message: string) {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SERVER_ENV.expoAccessToken}`,
        },
        body: JSON.stringify({
          to: notificationToken,
          sound: 'default',
          body: message,
        }),
      })

      if (response.status !== 200) {
        return new RestResponse({ statusCode: response.status })
      }

      return new RestResponse()
    },
  }
}
