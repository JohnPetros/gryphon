import type { RestResponse } from '@/core/responses'

export interface FileStorageService {
  upload(fileUri: string): Promise<RestResponse>
  read(fileName: string): Promise<RestResponse<string>>
}
