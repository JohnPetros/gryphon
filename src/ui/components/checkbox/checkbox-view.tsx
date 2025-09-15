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
  isInvalid?: boolean
  onChange: (value: boolean) => void
}

export const CheckboxView = ({
  isChecked,
  isInvalid = false,
  children,
  onChange,
}: PropsWithChildren<Props>) => {
  return (
    <Checkbox
      isDisabled={false}
      isInvalid={isInvalid}
      size='md'
      value={''}
      onChange={(isChecked) => onChange(isChecked)}
      isChecked={isChecked}
      className='flex-row gap-3'
    >
      <CheckboxIndicator
        className={mergeClassNames(
          'border-primary',
          isInvalid && isChecked
            ? 'bg-danger'
            : isChecked
              ? 'bg-primary'
              : 'bg-transparent',
        )}
      >
        <CheckboxIcon as={() => <Icon name='check' size={16} color='background' />} />
      </CheckboxIndicator>
      <CheckboxLabel className='text-lg text-accent'>{children}</CheckboxLabel>
    </Checkbox>
  )
}
