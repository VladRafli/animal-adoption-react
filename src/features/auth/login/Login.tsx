import { Lock, Person } from '@mui/icons-material'
import { Box, Button, Grid, Input, Link, Stack, Typography } from '@mui/joy'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  return (
    <>
      <Grid
        container
        columnSpacing={2}
        sx={{
          height: '100vh',
          width: '100%',
        }}
      >
        <Grid
          xs={7}
          sx={{
            background: 'url("./src/assets/images/Login_Asset_1.png")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></Grid>
        <Grid
          xs={5}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(243 244 246)',
          }}
        >
          <Box>
            <Stack spacing={2}>
              <Typography level='h1' fontSize='3xl'>
                Hello Again!
              </Typography>
              <Typography level='body1'>Welcome back</Typography>
              <Input
                variant='plain'
                type='email'
                placeholder='Username'
                startDecorator={<Person />}
              />
              <Input
                variant='plain'
                type='password'
                placeholder='Password'
                startDecorator={<Lock />}
              />
              <Button
                color='primary'
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/dashboard')
                }}
                variant='solid'
              >
                Login
              </Button>
              <Typography level='body1'>
                Don't have an account?{' '}
                <Link component={RouterLink} to='/auth/register' underline='always' color='neutral'>
                  Register now!
                </Link>
              </Typography>
              <Link component={RouterLink} to='/auth/forgot' underline='always' color='neutral'>
                Forgot Password
              </Link>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
