import { Box, Grid, Typography, Button } from '@mui/joy'
import { ArrowForward } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function Index() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography level='h1' sx={{
            marginBottom: '1rem',
        }}>Adopt Me is available now!</Typography>
        <Grid container spacing={2}>
          <Grid sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
            <Typography sx={{
                marginBottom: '1rem',
            }}>Are you managing animal shelter?</Typography>
            <Button
              onClick={() => navigate('/auth/login')}
            >
              Open our web portal here <ArrowForward />
            </Button>
          </Grid>
          <Grid sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
            <Typography sx={{
                marginBottom: '1rem',
            }}>Are you want to adopt an animal?</Typography>
            <Button
              onClick={() => {
                window.location = 'https://animaladoptions3.s3.ap-southeast-1.amazonaws.com/adoptme-latest.apk'
              }}
            >
              Download our app here <ArrowForward />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
