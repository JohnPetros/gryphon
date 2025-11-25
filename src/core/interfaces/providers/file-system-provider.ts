export interface FileSystemProvider {
  write(fileUri: string, data: unknown): Promise<{ fileUri: string }>
}
