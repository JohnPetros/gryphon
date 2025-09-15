import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@/ui/gluestack/slider'
import { mergeClassNames } from '@/ui/utils'

type Props = {
  value: number
  isInvalid: boolean
  onChange: (value: number) => void
}

export const LengthInputView = ({ value, isInvalid, onChange }: Props) => {
  return (
    <Box className='flex-col gap-6'>
      <Box className='flex-row justify-between items-center'>
        <Text className='text-lg'>Quantidade de caracteres</Text>
        <Text className={mergeClassNames('text-3xl', isInvalid && 'text-danger')}>
          {value}
        </Text>
      </Box>

      <Slider minValue={1} maxValue={24} step={1} value={value} onChange={onChange}>
        <SliderTrack className='bg-background'>
          <SliderFilledTrack
            className={mergeClassNames('bg-primary', isInvalid && 'bg-danger')}
          />
        </SliderTrack>
        <SliderThumb
          className={mergeClassNames('bg-primary', isInvalid && 'bg-danger')}
        />
      </Slider>
    </Box>
  )
}
