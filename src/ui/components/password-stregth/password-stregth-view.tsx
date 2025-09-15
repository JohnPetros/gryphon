import type { Password } from '@/core/domain/structures'

import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import { mergeClassNames } from '@/ui/utils'

const STRENGTH_LEVELS = [
  {
    label: 'Muito fraca',
    color: 'bg-danger border-danger',
  },
  {
    label: 'Fraca',
    color: 'bg-danger border-danger',
  },
  {
    label: 'Boa',
    color: 'bg-warning border-warning',
  },
  {
    label: 'Forte',
    color: 'bg-primary border-primary',
  },
  {
    label: 'Muito forte',
    color: 'bg-primary border-primary',
  },
]

type Props = {
  password: Password
  isLarge?: boolean
}

export const PasswordStregthView = ({ password, isLarge = false }: Props) => {
  const strength = password.strength - 1
  const levelIndex = Math.max(strength, 0)
  const currentLevel = STRENGTH_LEVELS[levelIndex]

  return (
    <Box className={mergeClassNames(isLarge ? 'flex-row gap-4' : 'items-center w-24')}>
      <Box className='mb-2'>
        <Text
          className={mergeClassNames(
            isLarge ? 'text-xl uppercase tracking-wide font-bold' : 'text-sm',
          )}
        >
          {currentLevel.label}
        </Text>
      </Box>

      <Box className={mergeClassNames('flex-row gap-1', isLarge && 'gap-2')}>
        {[0, 1, 2, 3, 4].map((index) => (
          <Box
            key={index}
            className={mergeClassNames(
              isLarge
                ? 'w-2 h-full'
                : 'w-2 h-4 rounded-none transition-colors duration-200 border',
              index <= strength && password.hasValue
                ? currentLevel.color
                : 'bg-neutral border-neutral',
            )}
          />
        ))}
      </Box>
    </Box>
  )
}
