import { useContext } from 'react'
import { ThemeContext as StyledThemeContext } from 'styled-components'
import { useTheme as useNextTheme } from 'next-themes'

const useTheme = () => {
  const { resolvedTheme, setTheme } = useNextTheme()
  const theme = useContext(StyledThemeContext)
  if (resolvedTheme !== 'dark') setTheme('dark')
  // force dark theme
  return { isDark: resolvedTheme === 'dark', theme, setTheme }
}

export default useTheme
