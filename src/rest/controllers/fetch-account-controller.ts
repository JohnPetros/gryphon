import { NotFoundError } from '@/core/domain/errors'
import { Id } from '@/core/domain/structures'
import type { AccountsRepository, Controller, Http } from '@/core/interfaces'

type Schema = {
  routeParams: {
    accountId: string
  }
}

export const FetchAccountController = (
  repository: AccountsRepository,
): Controller<Schema> => {
  return {
    async handle(http: Http<Schema>) {
      const { accountId } = http.getRouteParams()
      const account = await repository.findById(Id.create(accountId))
      if (!account) throw new NotFoundError('Account not found')
      return http.send(account?.dto)
    },
  }
}
