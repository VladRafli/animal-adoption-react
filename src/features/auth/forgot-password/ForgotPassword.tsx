import { Mail } from '@mui/icons-material'
import { Box, Button, Grid, Input, Link, Stack, Typography } from '@mui/joy'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import ForgotPasswordInterface from './interfaces/ForgotPasswordInterface'
import wretch from 'wretch'

export default function ForgotPassword() {
  const [form, setForm] = useState<ForgotPasswordInterface>({
    email: '',
  })

  const handleSubmit = () => {
    wretch(`${import.meta.env.VITE_API_URL}/v1/auth/forgot-password`)
      .options({
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
      })
      .post(form)
      .json((res) => {
        alert('Recovery link has been sent to your email.')
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
          xs={3}
          sx={{
            background: 'url("../src/assets/images/Login_Asset_1.png")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
          }}
        ></Grid>
        <Grid
          xs={6}
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
                Change Password
              </Typography>
              <Typography level='body1'>
                Please enter your email address. We will send you a link to
                reset your password.
              </Typography>
              <Input
                variant='plain'
                type='email'
                name='email'
                onChange={(e) => {
                  setForm({ ...form, [e.target.name]: e.target.value })
                }}
                placeholder='Email'
                startDecorator={<Mail />}
              />
              <Button color='primary' variant='solid' onClick={handleSubmit}>
                Submit
              </Button>
              <Typography>
                Remember the password? If do, you can{' '}
                <Link
                  component={RouterLink}
                  to='/auth/login'
                  underline='always'
                  color='neutral'
                >
                  login here.
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid
          xs={3}
          sx={{
            background: 'url("../src/assets/images/Login_Asset_1.png")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
          }}
        ></Grid>
      </Grid>
    </>
  )
}
