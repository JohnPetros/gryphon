import { Id } from '@/core/domain/structures'
import type { Controller, Http } from '@/core/interfaces'
import type { NotificationService } from '@/core/interfaces/services'

type Schema = {
  routeParams: {
    accountId: string
  }
  body: {
    title: string
    message: string
    route: string
  }
}

export const SendNotificationController = (
  service: NotificationService,
): Controller<Schema> => {
  return {
    async handle(http: Http<Schema>) {
      const { accountId } = http.getRouteParams()
      const { title, message, route } = await http.getBody()
      return await service.sendNotification(Id.create(accountId), title, message, route)
    },
  }
}
