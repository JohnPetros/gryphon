import { useState } from 'react'

export const useSwitch = (defaultChecked: boolean) => {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  function handleChange(value: boolean) {
    setIsChecked(value)
  }

  return { isChecked, handleChange }
}
