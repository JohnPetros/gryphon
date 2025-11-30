import { useCallback, useEffect, useState } from 'react'

import type { Credential } from '@/core/domain/entities'
import type { CredentialRotation, Id } from '@/core/domain/structures'
import type { CredentialsRepository } from '@/core/interfaces'
import type { DateTimeProvider } from '@/core/interfaces/providers/datetime-provider'
import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { HibpService, NotificationService } from '@/rest/services'
import { CLIENT_ENV } from '@/constants'
import { ExpoSecureStorageProvider } from '@/provision/storage-provider/expo-secure-storage-provider'
import {
  WatermelonAccountsRepository,
  WatermelonCredentialsRepository,
} from '@/database/watermelon'
import { ExpoCryptoProvider } from '@/provision/crypto-provider/expo-crypto-provider'
import { VerifyPasswordLeakJob } from '@/ui/hooks/verify-password-leak-job'
import { type NotificationClickEvent, OneSignal } from 'react-native-onesignal'

type Params = {
  vaultId: Id
  search: string
  credentialsRepository: CredentialsRepository
  credentialRotation?: CredentialRotation
  datetimeProvider: DateTimeProvider
  isDefaultCredentialsFilterChecked: boolean
  onCredentialDelete: () => void
}

export function useCredentialsList({
  vaultId,
  search,
  isDefaultCredentialsFilterChecked,
  credentialsRepository,
  credentialRotation,
  datetimeProvider,
  onCredentialDelete,
}: Params) {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOutdatedCredentialsFilterChecked, setIsOutdatedCredentialsFilterChecked] =
    useState<boolean | null>(isDefaultCredentialsFilterChecked)

  const loadCredentials = useCallback(
    async (isOutdated: boolean | null) => {
      if (!credentialRotation) return
      let expirationDate: Date | undefined
      setIsLoading(true)

      if (isOutdated) {
        expirationDate = credentialRotation.getExpirationDate(datetimeProvider)
      }

      const credentials =
        await credentialsRepository.findAllByVaultAndTitleAndLessThanUpdatingDate(
          vaultId,
          search,
          expirationDate,
        )
      setCredentials(credentials)
      setIsLoading(false)
    },
    [credentialsRepository, vaultId, search],
  )

  async function handleCredentialDelete() {
    await loadCredentials(isOutdatedCredentialsFilterChecked)
    onCredentialDelete()
  }

  function handleOutdatedCredentialsFilterChange(isChecked: boolean) {
    setIsOutdatedCredentialsFilterChecked(isChecked)
  }

  async function handlePasswordLeakVerificationButtonPress() {
    const notificationRestClient = AxiosRestClient(`${CLIENT_ENV.gryphonBaseUrl}/api`)
    const hibpRestClient = AxiosRestClient(CLIENT_ENV.hibpUrl)

    const accountsRepository = WatermelonAccountsRepository(false)
    const credentialsRepository = WatermelonCredentialsRepository(false)
    const expoCryptoProvider = ExpoCryptoProvider()
    const storageProvider = ExpoSecureStorageProvider()
    const notificationService = NotificationService(notificationRestClient)
    const hibpService = HibpService(hibpRestClient)

    const job = VerifyPasswordLeakJob({
      accountsRepository,
      credentialsRepository,
      notificationService,
      cryptoProvider: expoCryptoProvider,
      hibpService,
      storageProvider,
    })

    await job.handle()
  }

  useEffect(() => {
    loadCredentials(isOutdatedCredentialsFilterChecked)
  }, [
    vaultId,
    search,
    credentialsRepository,
    isOutdatedCredentialsFilterChecked,
    loadCredentials,
  ])

  useEffect(() => {
    async function handleNotificationClick(_: NotificationClickEvent) {
      await loadCredentials(true)
      setIsOutdatedCredentialsFilterChecked(true)
    }

    OneSignal.Notifications.addEventListener('click', handleNotificationClick)

    return () => {
      OneSignal.Notifications.removeEventListener('click', handleNotificationClick)
    }
  }, [])

  return {
    isLoading,
    credentials,
    isOutdatedCredentialsFilterChecked: Boolean(isOutdatedCredentialsFilterChecked),
    handleCredentialDelete,
    handleOutdatedCredentialsFilterChange,
    handlePasswordLeakVerificationButtonPress,
  }
}
