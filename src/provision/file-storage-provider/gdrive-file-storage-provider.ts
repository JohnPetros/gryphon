import type { RestClient } from '@/core/interfaces'

export const GdriveFileStorageProvider = (restClient: RestClient) => {
  return {
    async upload(path: string, file: File): Promise<void> {
      await restClient.post()
    },
  }
}
