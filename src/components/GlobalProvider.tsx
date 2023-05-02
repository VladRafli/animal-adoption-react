import primaryTheme from '@/theme/primaryTheme'
import {
  CssVarsProvider as JoyCssVarsProvider,
  ScopedCssBaseline,
} from '@mui/joy'
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
  THEME_ID,
} from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const materialTheme = materialExtendTheme()

export default function GlobalProvider({ children }: Props) {
  return (
    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider theme={primaryTheme}>
        <ScopedCssBaseline>{children}</ScopedCssBaseline>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  )
}
