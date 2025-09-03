import type { Password } from '@/core/domain/structures'

export function usePasswordStregth(password: Password) {
  return {
    passwordStregth: password.strength,
  }
}
