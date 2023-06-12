import { userIdAtom } from '@/data/user'
import { CloseRounded, Lock, Mail, Report } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Link,
  Stack,
  Typography,
} from '@mui/joy'
import { useAtom } from 'jotai'
import { useReducer } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import wretch from 'wretch'

export default function Login() {
  const navigate = useNavigate()

  const [form, updateForm] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next }
    },
    { email: '', password: '' }
  )

  const [alert, setAlert] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next }
    },
    { isOpen: false, message: '' }
  )

  const [userId, setUserId] = useAtom(userIdAtom)

  const handleSubmit = () => {
    setAlert({ isOpen: false, message: '' })

    wretch(`${import.meta.env.VITE_API_URL}/v1/auth/login`)
      .options({
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
      })
      .post(form)
      .unauthorized(() => {
        setAlert({ isOpen: true, message: 'Invalid credentials' })
      })
      .json((res) => {
        if (res.data.user.role === 'adopter') {
          setAlert({ isOpen: true, message: 'Role not authorized' })
          return
        }

        localStorage.setItem('access_token', res.data.accessToken)
        localStorage.setItem('refresh_token', res.data.refreshToken)
        setUserId(res.data.user.id)
        navigate('/dashboard')
      })
  }

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
            background: 'url("../src/assets/images/Login_Asset_1.png")',
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
              {alert.isOpen ? (
                <Alert
                  sx={{
                    display: alert.isOpen ? 'flex' : 'none',
                    alignItems: 'flex-start',
                  }}
                  startDecorator={<Report />}
                  variant='soft'
                  color='danger'
                  endDecorator={
                    <IconButton
                      variant='soft'
                      size='sm'
                      color='danger'
                      onClick={() => {
                        setAlert({ isOpen: false, message: '' })
                      }}
                    >
                      <CloseRounded />
                    </IconButton>
                  }
                >
                  <Typography level='body1' color='danger'>
                    {alert.message}
                  </Typography>
                </Alert>
              ) : (
                ''
              )}
              <Input
                variant='plain'
                type='email'
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
                placeholder='Email'
                startDecorator={<Mail />}
              />
              <Input
                variant='plain'
                type='password'
                value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })}
                placeholder='Password'
                startDecorator={<Lock />}
              />
              <Button color='primary' onClick={handleSubmit} variant='solid'>
                Login
              </Button>
              <Typography level='body1'>
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to='/auth/register'
                  underline='always'
                  color='neutral'
                >
                  Register now!
                </Link>
              </Typography>
              <Typography>
                Forgot your password?{' '}
                <Link
                  component={RouterLink}
                  to='/auth/forgot-password'
                  underline='always'
                  color='neutral'
                >
                  Restore it here.
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
