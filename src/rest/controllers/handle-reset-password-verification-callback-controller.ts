import type { Controller, Http } from '@/core/interfaces'

type Schema = {
  queryParams: {
    otp: string
  }
}

export const HandleResetPasswordVerificationCallbackController =
  (): Controller<Schema> => {
    return {
      async handle(http: Http<Schema>) {
        const { otp } = http.getQueryParams()
        const redirectUrl = `gryphon://auth/reset-password?otp=${otp}`
        return http.redirect(redirectUrl)
      },
    }
  }
