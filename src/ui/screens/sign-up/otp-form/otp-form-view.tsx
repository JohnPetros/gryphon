import { OtpInput } from 'react-native-otp-entry'

import { Box } from '@/ui/gluestack/box'
import { COLORS } from '@/constants/colors'
import { Text } from '@/ui/gluestack/text'
import { useMemo } from 'react'
import type { Theme } from '@/ui/contexts/theme-context/types'

type Props = {
  status: 'idle' | 'success' | 'error'
  theme: Theme
  isFilled: boolean
  onChange: (code: string) => void
  onFilled: (code: string) => void
}

export const OtpFormView = ({ status, theme, isFilled, onChange, onFilled }: Props) => {
  const borderColor = useMemo(() => {
    if (!isFilled) {
      return COLORS[theme].neutral
    }

    switch (status) {
      case 'error':
        return COLORS[theme].danger
      case 'success':
        return COLORS[theme].primary
      default:
        return COLORS[theme].neutral
    }
  }, [status, isFilled])

  return (
    <Box>
      <Text className='text-neutral text-xl'>
        Insira o código enviado ao seu seu e-mail.
      </Text>
      <Box className='mt-6'>
        <OtpInput
          numberOfDigits={6}
          onTextChange={onChange}
          onFilled={onFilled}
          theme={{
            pinCodeContainerStyle: {
              borderRadius: 4,
              borderWidth: 1,
              borderColor,
              backgroundColor: COLORS[theme].surface,
              width: 40,
              height: 48,
            },
            focusedPinCodeContainerStyle: {
              borderRadius: 4,
              borderWidth: 1,
              borderColor: isFilled ? borderColor : COLORS[theme].primary,
              backgroundColor: COLORS[theme].surface,
              width: 40,
              height: 48,
            },
            pinCodeTextStyle: {
              color: COLORS[theme].accent,
            },
          }}
        />
      </Box>
    </Box>
  )
}
