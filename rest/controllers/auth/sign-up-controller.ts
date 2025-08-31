import type { Controller } from '@/core/interfaces/controller'
import type { Http } from '@/core/interfaces/http'

export const SignUpController = (): Controller => {
  return {
    async handle(http: Http) {
      return http.send({ message: 'Hello from Expo!' })
    },
  }
}
