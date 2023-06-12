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
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const materialTheme = materialExtendTheme()

const queryClient = new QueryClient()

export default function GlobalProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider theme={primaryTheme}>
          <ScopedCssBaseline>{children}</ScopedCssBaseline>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </QueryClientProvider>
  )
}
