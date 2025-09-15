import type { Password } from '@/core/domain/structures'

import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { PasswordStregth } from '../../password-stregth'

type Props = {
  password: Password
}

export const StrengthView = ({ password }: Props) => {
  return (
    <Box className='flex-row justify-between items-center'>
      <Text className='text-lg text-neutral'>Força</Text>
      <PasswordStregth password={password} isLarge />
    </Box>
  )
}
