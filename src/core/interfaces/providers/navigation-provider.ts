export interface NavigationProvider {
  navigate(name: string, params?: any): void
  goBack(): void
}
