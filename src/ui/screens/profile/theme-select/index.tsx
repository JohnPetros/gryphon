import { useThemeContext } from '@/ui/hooks/use-theme-context'
import { ThemeSelectView } from './theme-select-view'
import { useThemeSelect } from './use-theme-select'

export const ThemeSelect = () => {
  const { theme, isFromSystem, changeTheme } = useThemeContext()
  const { options, selectedOption, handleChange } = useThemeSelect({
    selectTheme: theme,
    isFromSystem,
    onChangeTheme: changeTheme,
  })

  return (
    <ThemeSelectView options={options} value={selectedOption} onChange={handleChange} />
  )
}
