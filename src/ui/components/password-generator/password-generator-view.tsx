import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'

import type { Password } from '@/core/domain/structures'
import { PasswordInput } from './password-input'

type Props = {
  password: Password
  onReload: () => void
}

export const PasswordGeneratorView = ({ password, onReload }: Props) => {
  return (
    <Box>
      <Text>Gerador de senha</Text>
      <Box>
        <PasswordInput value={password.value} onReload={onReload} />
      </Box>
    </Box>
  )
}
