export const ROUTES = {
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
  },
  vault: {
    itens: (vauntId?: string) => `/vaunts/${vauntId ?? 'home'}/itens`,
  },
}
