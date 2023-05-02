import navigationData from '@/data/navigation.json'
import { Logout } from '@mui/icons-material'
import { Avatar, Box, Button, Grid, Link, Stack, Typography } from '@mui/joy'
import { borderRadius } from '@mui/system'
import { Link as RouterLink } from 'react-router-dom'

export default function DashboardLayout(props: any) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.primary[200],
      })}
    >
      <Grid
        container
        columnSpacing={2}
        sx={{
          height: '100vh',
          width: '100%',
          padding: '1rem',
        }}
      >
        <Grid xs={2} sx={{
          height: '100%',
        }}>
          <Stack
            direction='column'
            justifyContent='space-between'
            alignItems='start'
            sx={{
              height: '100%',
            }}
          >
            <Stack spacing={1}>
              <Avatar
                sx={{
                  height: '5rem',
                  width: '5rem',
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                }}
              />
              <Typography level='h2'>Admin Name</Typography>
              <Typography
                level='h5'
                sx={(theme) => ({
                  color: theme.palette.neutral[500],
                })}
              >
                admin@mail.com
              </Typography>
            </Stack>
            <Stack spacing={2}>
              {navigationData.data.map((item: any, index: number) => {
                return (
                  <Link
                    component={RouterLink}
                    to={item.to}
                    key={index}
                    sx={(theme) => ({
                      fontSize: theme.typography.h5.fontSize,
                      fontWeight: theme.typography.h5.fontWeight,
                      color: (window.location.pathname === item.to) ? theme.palette.text.primary : theme.palette.text.secondary,
                      '&:hover': {
                        color: (window.location.pathname === item.to) ? theme.palette.text.primary : theme.palette.text.tertiary,
                      }
                    })}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </Stack>
            <Stack>
              <Button
                variant='plain'
                color='danger'
                startDecorator={<Logout />}
                sx={(theme) => ({
                  fontSize: theme.typography.h5.fontSize,
                  fontWeight: theme.typography.h5.fontWeight,
                })}
              >
                Logout
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={10} sx={(theme) => ({
          height: '100%',
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          overflow: 'scroll'
        })}>{props.children}</Grid>
      </Grid>
    </Box>
  )
}
