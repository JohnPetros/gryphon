export const ROUTES = {
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
  },
  vaultItens: '(protected)/(tabs)/vault-itens',
  newVault: '(protected)/(tabs)/vault/new',
  vault: (vaultId: string) => `(protected)/vault/${vaultId}`,
  newItem: '(protected)/(tabs)/new-item',
  profile: '(protected)/(tabs)/profile',
  credential: (credentialId: string) => `(protected)/credential/${credentialId}`,
  credentialSettings: (credentialId: string) => `(protected)/credential/settings/${credentialId}`,
}
