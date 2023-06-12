import navigationData from '@/data/navigation.json'
import { userAtom, userIdAtom } from '@/data/user'
import { CloseRounded, Logout } from '@mui/icons-material'
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Grid,
  Input,
  Link,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy'
import { Buffer } from 'buffer/'
import { useAtom } from 'jotai'
import { useEffect, useReducer, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import wretch from 'wretch'

export default function DashboardLayout(props: any) {
  const navigate = useNavigate()

  const [userId] = useAtom(userIdAtom)
  const [user, setUser] = useAtom(userAtom)

  const [logoutModal, setLogoutModal] = useState(false)
  const [profileModal, setProfileModal] = useState(false)

  const [tempUser, setTempUser] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next }
    },
    { name: '', email: '', number: '', address: '', profilePicture: '' }
  )

  const [tempUploadedProfilePicture, setTempUploadedProfilePicture] =
    useState('')

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      alert('You are logged out. Login again to continue access the web.')
      navigate('/auth/login')
    }

    if (userId === '') {
      alert('You are logged out. Login again to continue access the web.')
      navigate('/auth/login')
    }

    wretch(`${import.meta.env.VITE_API_URL}/v1/auth/isloggedin`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .get()
      .unauthorized(() => {
        alert('You are logged out. Login again to continue access the web.')
        navigate('/auth/login')
      })

    wretch(`${import.meta.env.VITE_API_URL}/v1/users/${userId}`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .get()
      .json((res) => {
        setUser(res.data)
        setTempUser({
          name: res.data.name,
          email: res.data.email,
          number: res.data.number,
          address: res.data.address,
          profilePicture: res.data.profilePicture,
        })
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setLogoutModal(true)
  }

  const handleLogoutModal = () => {
    setLogoutModal(false)
    navigate('/auth/login')
  }

  const handleChangeProfile = () => {
    setProfileModal(false)
    wretch(`${import.meta.env.VITE_API_URL}/v1/users/${userId}`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .put(tempUser)
      .json((res) => {
        setUser(res.data)
        setTempUser({})
      })
  }

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
        <Grid
          xs={2}
          sx={{
            height: '100%',
          }}
        >
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
                src={user.profilePicture}
              />
              <Typography level='h2'>{user.name}</Typography>
              <Typography
                level='h5'
                sx={(theme) => ({
                  color: theme.palette.neutral[500],
                })}
              >
                {user.email}
              </Typography>
              <Button onClick={() => {
                  user.profilePicture !== null ? setTempUploadedProfilePicture(user.profilePicture) : setTempUploadedProfilePicture('')
                  setProfileModal(true)
                }}>
                Change Profile
              </Button>
            </Stack>
            <Stack spacing={2}>
              {navigationData.data.map((item: any, index: number) => {
                if (item.role.includes(user.role) === false) return null
                return (
                  <Link
                    component={RouterLink}
                    to={item.to}
                    key={index}
                    sx={(theme) => ({
                      fontSize: theme.typography.h5.fontSize,
                      fontWeight: theme.typography.h5.fontWeight,
                      color:
                        window.location.pathname === item.to
                          ? theme.palette.text.primary
                          : theme.palette.text.secondary,
                      '&:hover': {
                        color:
                          window.location.pathname === item.to
                            ? theme.palette.text.primary
                            : theme.palette.text.tertiary,
                      },
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
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          xs={10}
          sx={(theme) => ({
            height: '100%',
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            overflow: 'scroll',
          })}
        >
          {props.children}
        </Grid>
      </Grid>
      {logoutModal ? (
        <Modal open={logoutModal} onClose={() => setLogoutModal(false)}>
          <ModalDialog
            color='neutral'
            layout='center'
            size='md'
            variant='outlined'
          >
            <ModalClose />
            <Stack spacing={2}>
              <Typography level='h1' fontSize='3xl'>
                Logout
              </Typography>
              <Typography level='body1'>
                Are you sure you want to logout?
              </Typography>
              <Stack direction='row' spacing={2}>
                <Button
                  variant='solid'
                  color='danger'
                  startDecorator={<Logout />}
                  onClick={handleLogoutModal}
                >
                  Logout
                </Button>
                <Button
                  variant='solid'
                  color='neutral'
                  startDecorator={<CloseRounded />}
                  onClick={() => setLogoutModal(false)}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </ModalDialog>
        </Modal>
      ) : (
        ''
      )}
      {profileModal ? (
        <Modal open={profileModal} onClose={() => setProfileModal(false)}>
          <ModalDialog
            color='neutral'
            layout='center'
            size='lg'
            variant='outlined'
            sx={{
              width: '50vw',
              overflowY: 'scroll',
            }}
          >
            <ModalClose />
            <Stack spacing={2}>
              <Typography level='h1' fontSize='3xl'>
                Profile
              </Typography>
              <Typography level='body1'>
                Change your profile information
              </Typography>
              <Stack direction='column' spacing={2}>
                <Input
                  variant='outlined'
                  type='text'
                  placeholder='Name'
                  value={tempUser.name}
                  onChange={(e) => setTempUser({ name: e.target.value })}
                />
                <Input
                  variant='outlined'
                  type='email'
                  placeholder='Email'
                  value={tempUser.email}
                  onChange={(e) => setTempUser({ email: e.target.value })}
                />
                <Input
                  variant='outlined'
                  type='text'
                  placeholder='Phone Number'
                  value={tempUser.number}
                  onChange={(e) => setTempUser({ number: e.target.value })}
                />
                <Input
                  variant='outlined'
                  type='text'
                  placeholder='Address'
                  value={tempUser.address}
                  onChange={(e) => setTempUser({ address: e.target.value })}
                />
                <AspectRatio
                  objectFit='contain'
                  sx={{
                    marginBottom: '1rem',
                  }}
                >
                  <img
                    src={tempUploadedProfilePicture}
                    onLoad={() =>
                      URL.revokeObjectURL(tempUploadedProfilePicture)
                    }
                  />
                </AspectRatio>
                <Button
                  variant='solid'
                  color='danger'
                  onClick={() => {
                    setTempUploadedProfilePicture('')
                    setTempUser({ profilePicture: '' })
                  }}
                >
                  Remove Profile Picture
                </Button>
                <Button variant='solid' color='neutral' component='label'>
                  Upload File
                  <input
                    type='file'
                    hidden
                    onChange={async (e) => {
                      if (e.target.files === null) return
                      setTempUploadedProfilePicture(
                        URL.createObjectURL(e.target.files[0])
                      )

                      const fileArrayBuffer =
                        await e.target.files[0].arrayBuffer()

                      setTempUser({
                        profilePicture:
                          Buffer.from(fileArrayBuffer).toString('base64'),
                      })
                    }}
                  />
                </Button>
                <Button
                  variant='solid'
                  color='primary'
                  onClick={handleChangeProfile}
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          </ModalDialog>
        </Modal>
      ) : (
        ''
      )}
    </Box>
  )
}
