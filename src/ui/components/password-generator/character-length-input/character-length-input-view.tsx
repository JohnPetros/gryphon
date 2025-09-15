import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@/ui/gluestack/slider'

type Props = {
  value: number
  onChange: (value: number) => void
}

export const CharacterLengthInputView = ({ value, onChange }: Props) => {
  return (
    <Box className='flex-col gap-6'>
      <Box className='flex-row justify-between items-center'>
        <Text className='text-lg'>Quantidade de caracteres</Text>
        <Text className='text-3xl text-primary'>{value}</Text>
      </Box>

      <Slider minValue={1} maxValue={24} step={1} value={value} onChange={onChange}>
        <SliderTrack className='bg-black'>
          <SliderFilledTrack className='bg-primary' />
        </SliderTrack>
        <SliderThumb className='bg-primary' />
      </Slider>
    </Box>
  )
}
