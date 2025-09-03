import { OtpInput } from 'react-native-otp-entry'

import { Box } from '@/ui/gluestack/box'
import { COLORS } from '@/constants/colors'
import { Text } from '@/ui/gluestack/text'
import { useMemo } from 'react'

type Props = {
  status: 'idle' | 'success' | 'error'
  isFilled: boolean
  onChange: (code: string) => void
  onFilled: (code: string) => void
}

export const OtpFormView = ({ status, isFilled, onChange, onFilled }: Props) => {
  const borderColor = useMemo(() => {
    if (!isFilled) {
      return COLORS.dark.neutral
    }

    switch (status) {
      case 'error':
        return COLORS.dark.danger
      case 'success':
        return COLORS.dark.primary
      default:
        return COLORS.dark.neutral
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
              backgroundColor: COLORS.dark.surface,
              width: 40,
              height: 48,
            },
            focusedPinCodeContainerStyle: {
              borderRadius: 4,
              borderWidth: 1,
              borderColor: isFilled ? borderColor : COLORS.dark.primary,
              backgroundColor: COLORS.dark.surface,
              width: 40,
              height: 48,
            },
            pinCodeTextStyle: {
              color: COLORS.dark.accent,
            },
          }}
        />
      </Box>
    </Box>
  )
}
