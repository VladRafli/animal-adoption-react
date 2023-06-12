import { CloseRounded, Lock, Mail, Person, Report } from '@mui/icons-material'
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
import { useReducer } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import wretch from 'wretch'

export default function Register() {
  const navigate = useNavigate()

  const [form, updateForm] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next }
    },
    { name: '', email: '', password: '', repassword: '' }
  )

  const [submitForm, updateSubmitForm] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next }
    },
    { name: '', email: '', password: '', role: 'shelter' }
  )

  const [alert, setAlert] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next }
    },
    { isOpen: false, message: '' }
  )

  const [success, setSuccess] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next }
    },
    { isOpen: false, message: '' }
  )

  const handleSubmit = () => {
    setAlert({ isOpen: false, message: '' })
    setSuccess({ isOpen: false, message: '' })
    updateSubmitForm({ name: '', email: '', password: '' })

    if (form.password !== form.repassword) {
      setAlert({ isOpen: true, message: 'Password does not match' })
      return
    }

    updateSubmitForm({
      name: form.name,
      email: form.email,
      password: form.password,
    })

    wretch(`${import.meta.env.VITE_API_URL}/v1/auth/register`)
      .options({
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
      })
      .post(submitForm)
      .badRequest((err) => {
        const { message } = err.json
        setAlert({ isOpen: true, message: JSON.stringify(message) })
      })
      .json(() => {
        setSuccess({
          isOpen: true,
          message: 'Registration success! Please login to continue.',
        })
        setTimeout(() => {
          navigate('/auth/login')
        }, 3000)
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
                Hi there!
              </Typography>
              <Typography level='body1'>
                Welcome to Adopt Me! Please register yourself to use the app.
              </Typography>
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
              {success.isOpen ? (
                <Alert
                  sx={{
                    display: success.isOpen ? 'flex' : 'none',
                    alignItems: 'flex-start',
                  }}
                  startDecorator={<Report />}
                  variant='soft'
                  color='success'
                  endDecorator={
                    <IconButton
                      variant='soft'
                      size='sm'
                      color='success'
                      onClick={() => {
                        setAlert({ isOpen: false, message: '' })
                      }}
                    >
                      <CloseRounded />
                    </IconButton>
                  }
                >
                  <Typography level='body1' color='success'>
                    {success.message}
                  </Typography>
                </Alert>
              ) : (
                ''
              )}
              <Input
                variant='plain'
                type='text'
                value={form.name}
                onChange={(e) => {
                  updateForm({ name: e.target.value })
                }}
                placeholder='Profile Name'
                startDecorator={<Person />}
              />
              <Input
                variant='plain'
                type='email'
                value={form.email}
                onChange={(e) => {
                  updateForm({ email: e.target.value })
                }}
                placeholder='Email'
                startDecorator={<Mail />}
              />
              <Input
                variant='plain'
                type='password'
                value={form.password}
                onChange={(e) => {
                  updateForm({ password: e.target.value })
                }}
                placeholder='Password'
                startDecorator={<Lock />}
              />
              <Input
                variant='plain'
                type='password'
                value={form.repassword}
                onChange={(e) => {
                  updateForm({ repassword: e.target.value })
                }}
                placeholder='Re-type Password'
                startDecorator={<Lock />}
              />
              <Button color='primary' onClick={handleSubmit} variant='solid'>
                Register
              </Button>
              <Typography level='body1'>
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to='/auth/login'
                  underline='always'
                  color='neutral'
                >
                  Login now!
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid
          xs={7}
          sx={{
            background: 'url("../src/assets/images/Login_Asset_1.png")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></Grid>
      </Grid>
    </>
  )
}
