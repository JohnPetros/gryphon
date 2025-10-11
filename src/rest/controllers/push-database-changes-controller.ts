import type { CredentialDto } from '@/core/domain/entities/dtos'
import type { Controller } from '@/core/interfaces/controller'
import type { Http } from '@/core/interfaces/http'

type Schema = {
  body: {
    createdCredentials: CredentialDto[]
    updatedCredentials: CredentialDto[]
    deletedCredentialsIds: string[]
  }
}

export const PushDatabaseChangesController = (): Controller<Schema> => {
  return {
    async handle(http: Http<Schema>) {
      const { createdCredentials, updatedCredentials, deletedCredentialsIds } =
        await http.getBody()

      return http.send({ message: 'Database synchronized!' })
    },
  }
}
