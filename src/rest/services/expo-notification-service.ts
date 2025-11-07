import type { NotificationService } from '@/core/interfaces/services'

import { SERVER_ENV } from '@/constants/server-env'

export const ExpoNotificationService = (): NotificationService => {
  return {
    async sendNotification(notificationToken: string) {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SERVER_ENV.expoAccessToken}`,
        },
        body: JSON.stringify({
          to: notificationToken,
          sound: 'default',
          body: 'Hello world!',
        }),
      })
    },
  }
}
