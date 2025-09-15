import type { PropsWithChildren } from 'react'

import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from '@/ui/gluestack/checkbox'
import { Icon } from '../icon'

type Props = {
  isChecked: boolean
  onChange: (value: boolean) => void
}

export const CheckboxView = ({
  isChecked,
  onChange,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Checkbox
      isDisabled={false}
      isInvalid={false}
      size='md'
      value={''}
      onChange={() => onChange(!isChecked)}
      isChecked={isChecked}
      className='flex-row gap-3'
    >
      <CheckboxIndicator>
        <CheckboxIcon as={() => <Icon name='check' />} />
      </CheckboxIndicator>
      <CheckboxLabel className='text-lg text-accent'>{children}</CheckboxLabel>
    </Checkbox>
  )
}
