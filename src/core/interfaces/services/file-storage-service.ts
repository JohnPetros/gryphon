import type { FileDto } from '@/core/domain/entities/dtos'
import type { Id } from '@/core/domain/structures'
import type { RestResponse } from '@/core/responses'

export interface FileStorageService {
  upload(fileUri: string): Promise<RestResponse>
  read(fileName: string): Promise<RestResponse<FileDto>>
  getFileById(fileId: Id): Promise<RestResponse<string>>
}
