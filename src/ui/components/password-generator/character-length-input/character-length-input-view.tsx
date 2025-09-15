import { Box } from '@/ui/gluestack/box'
import { Text } from '@/ui/gluestack/text'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@/ui/gluestack/slider'

export const CharacterLengthInputView = () => {
  return (
    <Box className='flex-row justify-between items-center'>
      <Text className='text-xl'>Quantidade de caracteres</Text>
      <Text className='text-lg text-primary'>10</Text>

      <Slider minValue={1} maxValue={24} step={1}>
        <SliderTrack className='bg-surface'>
          <SliderFilledTrack className='bg-primary' />
        </SliderTrack>
        <SliderThumb className='bg-primary' />
      </Slider>
    </Box>
  )
}
