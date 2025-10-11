import { Credential } from '@/core/domain/entities'
import { Id } from '@/core/domain/structures'
import type { CredentialDto } from '@/core/domain/entities/dtos'
import type { CredentialsRepository } from '@/core/interfaces'
import type { Controller } from '@/core/interfaces/controller'
import type { Http } from '@/core/interfaces/http'

type Schema = {
  body: {
    createdCredentials: CredentialDto[]
    updatedCredentials: CredentialDto[]
    deletedCredentialsIds: string[]
  }
}

export const PushDatabaseChangesController = (
  credentialsRepository: CredentialsRepository,
): Controller<Schema> => {
  return {
    async handle(http: Http<Schema>) {
      const {
        createdCredentials = [],
        updatedCredentials = [],
        deletedCredentialsIds = [],
      } = await http.getBody()

      await Promise.all([
        credentialsRepository.addMany(createdCredentials.map(Credential.create)),
        credentialsRepository.updateMany(updatedCredentials.map(Credential.create)),
        credentialsRepository.removeMany(deletedCredentialsIds.map(Id.create)),
      ])

      return http.send({ message: 'Database synchronized!' })
    },
  }
}
