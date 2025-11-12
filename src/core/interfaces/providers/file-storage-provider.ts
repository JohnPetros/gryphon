export interface FileStorageProvider {
  upload(path: string, file: File): Promise<void>
}
