type Theme = 'light' | 'dark' | 'system'

const THEME_OPTIONS = ['light', 'dark', 'sistema'] as const

type Params = {
  selectTheme: Theme
  isFromSystem: boolean
  onChangeTheme: (theme: Theme | 'system') => void
}

export const useThemeSelect = ({ selectTheme, isFromSystem, onChangeTheme }: Params) => {
  async function handleChange(option: string) {
    if (option === 'sistema') {
      onChangeTheme('system')
      return
    }
    onChangeTheme(option as Theme)
  }

  const selectedOption = isFromSystem
    ? 'sistema'
    : (THEME_OPTIONS.find((option) => option === selectTheme) ?? 'sistema')

  return {
    selectedOption,
    options: THEME_OPTIONS.map(String),
    handleChange,
  }
}
