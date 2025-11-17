import type {
  AccountsRepository,
  Controller,
  CredentialsRepository,
  CredentialVersionsRepository,
  Http,
} from '@/core/interfaces'
import { DateTimeProvider } from '@/core/interfaces/providers/datetime-provider'
import type { NotificationService } from '@/core/interfaces/services'

type Dependencies = {
  accountsRepository: AccountsRepository
  credentialsRepository: CredentialsRepository
  credentialVersionsRepository: CredentialVersionsRepository
  notificationService: NotificationService
  datetimeProvider: DateTimeProvider
}

export const VerifyOutdatedCredentialsController = ({
  accountsRepository,
  credentialVersionsRepository,
  credentialsRepository,
  notificationService,
  datetimeProvider,
}: Dependencies): Controller => {
  return {
    async handle(http: Http) {
      const credentials = await credentialsRepository.findAll()
      const credentialCountByAccount: Record<string, number> = {}

      for (const credential of credentials) {
        const lastVersion = await credentialVersionsRepository.findLastByCredential(
          credential.id,
        )
        if (!lastVersion) continue

        const account = await accountsRepository.findByCredential(credential.id)
        if (!account) continue
        
        const isVersionOutdated = lastVersion.isOutdated(account?.credentialRotation, datetimeProvider)

        if (isVersionOutdated) {
          if (!account || !account.notificationToken) continue
          credentialCountByAccount[account.notificationToken] += 1
        }
      }

      for (const [token, count] of Object.entries(credentialCountByAccount)) {
        if (count > 1)
          await notificationService.sendNotification(
            token,
            `${count} credenciais estão desatualizadas, certifique-se de atualizá-las`,
          )

        await notificationService.sendNotification(
          token,
          '1 credencial está desatualizada, certifique-se de atualizá-la',
        )
      }

      return http.send({ message: 'ok' })
    },
  }
}
