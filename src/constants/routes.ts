export const ROUTES = {
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
  },
  vault: {
    itens: (vaultId?: string) => `/vaults/${vaultId ?? 'home'}/itens`,
  },
  newItem: '(protected)/(tabs)/new-item',
}
