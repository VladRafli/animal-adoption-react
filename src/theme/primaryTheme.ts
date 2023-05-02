import { extendTheme } from '@mui/joy/styles'

const primaryTheme = extendTheme({
  components: {
    JoyLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          textDecorationColor: theme.palette.text.primary,
          transition: 'color 0.2s ease-in-out',
          '&:hover': {
            color: theme.palette.text.tertiary,
          }
        })
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({theme}) => ({
          transition: 'all 0.2s ease-in-out',
        })
      }
    }
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          '50': '#fff8e1',
          '100': '#ffecb3',
          '200': '#ffe082',
          '300': '#ffd54f',
          '400': '#ffca28',
          '500': '#ffc107',
          '600': '#ffb300',
          '700': '#ffa000',
          '800': '#ff8f00',
          '900': '#ff6f00',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          '50': '#fff8e1',
          '100': '#ffecb3',
          '200': '#ffe082',
          '300': '#ffd54f',
          '400': '#ffca28',
          '500': '#ffc107',
          '600': '#ffb300',
          '700': '#ffa000',
          '800': '#ff8f00',
          '900': '#ff6f00',
        },
      },
    },
  },
})

export default primaryTheme
