import { HTTP_STATUS_CODE } from '@/core/constants'
import { Id } from '@/core/domain/structures'
import type { AccountsRepository } from '@/core/interfaces'
import type { Controller, Http } from '@/core/interfaces'

type Dependencies = {
  accountsRepository: AccountsRepository
}

type Schema = {
  routeParams: {
    accountId: string
  }
}

export const ResetDatabaseController = ({
  accountsRepository,
}: Dependencies): Controller<Schema> => {
  return {
    async handle(http: Http<Schema>) {
      const params = http.getRouteParams()
      const accountId = Id.create(params.accountId)

      await accountsRepository.remove(accountId)

      return http.send(null)
    },
  }
}
