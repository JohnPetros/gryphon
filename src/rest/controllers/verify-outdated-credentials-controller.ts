import type {
  AccountsRepository,
  Controller,
  CredentialsRepository,
  CredentialVersionsRepository,
  Http,
} from '@/core/interfaces'
import type { DateTimeProvider } from '@/core/interfaces/providers/datetime-provider'
import type { NotificationService } from '@/core/interfaces/services'

const VAULT_ITENS_ROUTE = '/vault-itens?activeTab=credential&outdated=true'

type Dependencies = {
  accountsRepository: AccountsRepository
  credentialsRepository: CredentialsRepository
  credentialVersionsRepository: CredentialVersionsRepository
  notificationService: NotificationService
  datetimeProvider: DateTimeProvider
}

export const VerifyOutdatedCredentialsController = ({
  accountsRepository,
  credentialsRepository,
  notificationService,
  datetimeProvider,
}: Dependencies): Controller => {
  return {
    async handle(http: Http) {
      const accounts = await accountsRepository.findAll()

      for (const account of accounts) {
        const expirationDate =
          account.credentialRotation.getExpirationDate(datetimeProvider)

        const count =
          await credentialsRepository.countAllLessThanUpdatingDate(expirationDate)
        if (count === 0) continue

        if (count > 1) {
          const response = await notificationService.sendNotification(
            account.id,
            'Aviso de segurança',
            `${count} credenciais estão desatualizadas, certifique-se de atualizá-las`,
            VAULT_ITENS_ROUTE,
          )
          if (response.isFailure) response.throwError()
        } else {
          const response = await notificationService.sendNotification(
            account.id,
            'Aviso de segurança',
            '1 credencial está desatualizada, certifique-se de atualizá-la',
            VAULT_ITENS_ROUTE,
          )
          if (response.isFailure) response.throwError()
        }
      }

      return http.send({ message: 'ok' })
    },
  }
}
