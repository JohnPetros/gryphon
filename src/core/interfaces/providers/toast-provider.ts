type ToastType = 'success' | 'error' | 'warning'

export interface ToastProvider {
  show(description: string, type: ToastType): void
}
