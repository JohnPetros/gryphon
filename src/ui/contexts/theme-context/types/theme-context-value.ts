export type ThemeContextValue = {
  theme: 'light' | 'dark'
  isFromSystem: boolean
  changeTheme(theme: 'light' | 'dark' | 'system'): void
}
