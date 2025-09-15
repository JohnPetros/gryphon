import type { PropsWithChildren } from 'react'

import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from '@/ui/gluestack/checkbox'
import { Icon } from '../icon'
import { mergeClassNames } from '@/ui/utils'

type Props = {
  isChecked: boolean
  onChange: (value: boolean) => void
}

export const CheckboxView = ({
  isChecked,
  children,
  onChange,
}: PropsWithChildren<Props>) => {
  return (
    <Checkbox
      isDisabled={false}
      isInvalid={false}
      size='md'
      value={''}
      onChange={(isChecked) => onChange(isChecked)}
      isChecked={isChecked}
      className='flex-row gap-3'
    >
      <CheckboxIndicator
        className={mergeClassNames(
          'border-primary',
          isChecked ? 'bg-primary' : 'bg-transparent',
        )}
      >
        <CheckboxIcon as={() => <Icon name='check' size={16} color='background' />} />
      </CheckboxIndicator>
      <CheckboxLabel className='text-lg text-accent'>{children}</CheckboxLabel>
    </Checkbox>
  )
}
