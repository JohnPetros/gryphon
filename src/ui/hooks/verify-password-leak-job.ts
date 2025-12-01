import { STORAGE_KEYS } from '@/constants'
import { Id } from '@/core/domain/structures'
import type {
  AccountsRepository,
  CredentialsRepository,
  CryptoProvider,
} from '@/core/interfaces'
import type { StorageProvider } from '@/core/interfaces/providers'
import type { HibpService, NotificationService } from '@/core/interfaces/services'
import { Alert } from 'react-native'

type Dependencies = {
  cryptoProvider: CryptoProvider
  hibpService: HibpService
  notificationService: NotificationService
  storageProvider: StorageProvider
  accountsRepository: AccountsRepository
  credentialsRepository: CredentialsRepository
}

export const VerifyPasswordLeakJob = ({
  accountsRepository,
  cryptoProvider,
  storageProvider,
  hibpService,
  notificationService,
  credentialsRepository,
}: Dependencies) => {
  return {
    async handle() {
      try {
        const storedAccountId = await storageProvider.getItem(STORAGE_KEYS.accountId)
        if (!storedAccountId) return

        const accountId = Id.create(storedAccountId)
        const account = await accountsRepository.findById(accountId)
        if (!account) return

        let masterPassword = await storageProvider.getItem(STORAGE_KEYS.masterPassword)
        if (!masterPassword) return

        const encryptionKey = await cryptoProvider.deriveKey(
          masterPassword,
          account.encryptionSalt,
        )
        masterPassword = null
        const credentials = await credentialsRepository.findAllByAccount(accountId)

        for (const credential of credentials) {
          const decryptedData = credential.encrypted.decrypt(
            encryptionKey,
            cryptoProvider,
          )
          if (!decryptedData) continue
          const credentialPassword = decryptedData.password
          const passwordHash = await cryptoProvider.hash(credentialPassword)
          const passwordHashPrefix = passwordHash.slice(0, 5)

          const response = await hibpService.getPasswords(passwordHashPrefix)
          if (response.isFailure) continue

          for (const passwordSuffix of response.body) {
            const leakedPassword = passwordHashPrefix + passwordSuffix.split(':')[0]
            const isPasswordLeak =
              leakedPassword.toUpperCase() === passwordHash.toUpperCase()
            if (isPasswordLeak) {
              Alert.alert(
                'Senha vazada detectada',
                `Senha vazada detectada para o login ${credential.title} em sua conta. Por favor, altere-a imediatamente.`,
              )
              await notificationService.sendNotification(
                accountId,
                'Aviso crítico de segurança',
                `Senha vazada detectada para o login ${credential.title} em sua conta. Por favor, altere-a imediatamente.`,
                `/credential/${credential.id.value}`,
              )
            }
          }
        }
      } catch (error) {
        console.error('Error verifying password leak', error)
        return
      }
    },
  }
}
