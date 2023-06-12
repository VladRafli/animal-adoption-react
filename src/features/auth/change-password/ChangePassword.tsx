import ChangePasswordInterface from '@/interfaces/ChangePasswordInterface'
import { CloseRounded, Key, Report } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import wretch from 'wretch'

export default function ChangePassword() {
  const navigate = useNavigate()

  const [form, setForm] = useState<ChangePasswordInterface>({
    password: '',
    repassword: '',
  })

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

  const [modal, setModal] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next }
    },
    { isOpen: false, message: '' }
  )

  const [submitDisabled, setSubmitDisabled] = useState(true)

  const handleSubmit = () => {
    setAlert({ isOpen: false, message: '' })
    setSuccess({ isOpen: false, message: '' })

    const token = new URL(window.location.href).searchParams.get('token')

    if (form.password === '' || form.repassword === '') {
      setAlert({ isOpen: true, message: 'Fields cannot be empty' })
      return
    }

    if (form.password !== form.repassword) {
      setAlert({ isOpen: true, message: 'Password does not match' })
      return
    }

    wretch(`${import.meta.env.VITE_API_URL}/v1/auth/reset-password/${token}`)
      .options({ mode: 'cors' })
      .post({
        password: form.password,
      })
      .badRequest((error) => {
        const { message } = error.json

        setAlert({ isOpen: true, message })
      })
      .json((data) => {
        setSuccess({ isOpen: true, message: data.message })
        setTimeout(() => {
          navigate('/auth/login')
        }, 3000)
      })
  }

  useEffect(() => {
    const token = new URL(window.location.href).searchParams.get('token')

    if (token === null || token === '') {
      setModal({ isOpen: true, message: 'Token is empty' })
      return
    }

    wretch(`${import.meta.env.VITE_API_URL}/v1/auth/reset-password/${token}`)
      .options({ mode: 'cors' })
      .get()
      .badRequest((error) => {
        const { message } = error.json

        setModal({ isOpen: true, message })
      })

    setSubmitDisabled(false)
  }, [])

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
                Be mindful towards yourself when creating new password. Make
                sure its secure and easy to remember.
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
                type='password'
                name='password'
                onChange={(e) => {
                  setForm({ ...form, [e.target.name]: e.target.value })
                }}
                placeholder='New Password'
                startDecorator={<Key />}
              />
              <Input
                variant='plain'
                type='password'
                name='repassword'
                onChange={(e) => {
                  setForm({ ...form, [e.target.name]: e.target.value })
                }}
                placeholder='Re-enter new Password'
                startDecorator={<Key />}
              />
              <Button
                color='primary'
                onClick={handleSubmit}
                variant='solid'
                disabled={submitDisabled}
              >
                Submit
              </Button>
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
      {modal.isOpen ? (
        <Modal open={modal.isOpen} onClose={() => setModal({ isOpen: false })}>
          <ModalDialog
            color='neutral'
            layout='center'
            size='md'
            variant='outlined'
          >
            <ModalClose />
            <Typography
              level='body1'
              sx={{
                marginBottom: '1rem',
              }}
            >
              {modal.message}
            </Typography>
            {submitDisabled ? (
              <Button
                onClick={() => {
                  navigate('/auth/login')
                }}
              >
                Return to login page
              </Button>
            ) : (
              ''
            )}
          </ModalDialog>
        </Modal>
      ) : (
        ''
      )}
    </>
  )
}
