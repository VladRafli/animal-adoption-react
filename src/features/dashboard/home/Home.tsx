import { userAtom } from '@/data/user'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Box, Grid, Stack, Typography } from '@mui/joy'
import { useAtom } from 'jotai'
import { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { useNavigate } from 'react-router-dom'
import wretch from 'wretch'

export default function Home() {
  const navigate = useNavigate()
  const [user] = useAtom(userAtom)
  const [statistics, setStatistics] = useState<{
    totalUsers: number[]
    totalAnimals: number[]
    totalShelters: number[]
    totalAdoptions: number[]
  }>({
    totalUsers: [],
    totalAnimals: [],
    totalShelters: [],
    totalAdoptions: [],
  })

  useEffect(() => {
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

    wretch(`${import.meta.env.VITE_API_URL}/v1/statistics`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .get()
      .json((res) => {
        setStatistics({
          totalUsers: res.data.map((val: any) => val.userStatistics.totalUser),
          totalAnimals: res.data.map(
            (val: any) => val.animalStatistics.totalAnimal
          ),
          totalShelters: res.data.map(
            (val: any) => val.userStatistics.totalShelter
          ),
          totalAdoptions: res.data.map(
            (val: any) => val.adoptionStatistics.totalAdoption
          ),
        })
      })
  }, [])

  return (
    <DashboardLayout>
      <Stack spacing={2}>
        <Box>
          <Typography level='h2'>Dashboard</Typography>
        </Box>
        <Box>
          <Grid container columnSpacing={2}>
            {user.role === 'admin' ? (
              <>
                <Grid xs={3}>
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.palette.neutral[50],
                      border: `solid 1px ${theme.palette.neutral[200]}`,
                    })}
                  >
                    <Box
                      sx={{
                        padding: '1rem',
                      }}
                    >
                      <Typography
                        level='body1'
                        sx={(theme) => ({
                          color: theme.palette.neutral[500],
                        })}
                      >
                        Total Users
                      </Typography>
                      <Typography level='h4'>
                        {statistics.totalUsers !== undefined
                          ? statistics.totalUsers.slice(-1)
                          : ''}
                      </Typography>
                    </Box>
                    <Chart
                      options={{
                        chart: {
                          toolbar: {
                            show: false,
                          },
                        },
                        stroke: {
                          curve: 'smooth',
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        xaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        yaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        grid: {
                          show: false,
                        },
                      }}
                      series={[
                        {
                          name: 'User',
                          data:
                            statistics.totalUsers !== undefined
                              ? statistics.totalUsers
                              : [],
                        },
                      ]}
                      type='area'
                    />
                  </Box>
                </Grid>
                <Grid xs={3}>
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.palette.neutral[50],
                      border: `solid 1px ${theme.palette.neutral[200]}`,
                    })}
                  >
                    <Box
                      sx={{
                        padding: '1rem',
                      }}
                    >
                      <Typography
                        level='body1'
                        sx={(theme) => ({
                          color: theme.palette.neutral[500],
                        })}
                      >
                        Total Animal
                      </Typography>
                      <Typography level='h4'>
                        {statistics.totalAnimals !== undefined
                          ? statistics.totalAnimals.slice(-1)
                          : ''}
                      </Typography>
                    </Box>
                    <Chart
                      options={{
                        chart: {
                          toolbar: {
                            show: false,
                          },
                        },
                        stroke: {
                          curve: 'smooth',
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        xaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        yaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        grid: {
                          show: false,
                        },
                      }}
                      series={[
                        {
                          name: 'Animal',
                          data:
                            statistics.totalAnimals !== undefined
                              ? statistics.totalAnimals
                              : [],
                        },
                      ]}
                      type='area'
                    />
                  </Box>
                </Grid>
                <Grid xs={3}>
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.palette.neutral[50],
                      border: `solid 1px ${theme.palette.neutral[200]}`,
                    })}
                  >
                    <Box
                      sx={{
                        padding: '1rem',
                      }}
                    >
                      <Typography
                        level='body1'
                        sx={(theme) => ({
                          color: theme.palette.neutral[500],
                        })}
                      >
                        Total Shelters
                      </Typography>
                      <Typography level='h4'>
                        {statistics.totalShelters !== undefined
                          ? statistics.totalShelters.slice(-1)
                          : ''}
                      </Typography>
                    </Box>
                    <Chart
                      options={{
                        chart: {
                          toolbar: {
                            show: false,
                          },
                        },
                        stroke: {
                          curve: 'smooth',
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        xaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        yaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        grid: {
                          show: false,
                        },
                      }}
                      series={[
                        {
                          name: 'Shelter',
                          data:
                            statistics.totalShelters !== undefined
                              ? statistics.totalShelters
                              : [],
                        },
                      ]}
                      type='area'
                    />
                  </Box>
                </Grid>
                <Grid xs={3}>
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.palette.neutral[50],
                      border: `solid 1px ${theme.palette.neutral[200]}`,
                    })}
                  >
                    <Box
                      sx={{
                        padding: '1rem',
                      }}
                    >
                      <Typography
                        level='body1'
                        sx={(theme) => ({
                          color: theme.palette.neutral[500],
                        })}
                      >
                        Total Adopted Animal
                      </Typography>
                      <Typography level='h4'>
                        {statistics.totalAdoptions !== undefined
                          ? statistics.totalAdoptions.slice(-1)
                          : ''}
                      </Typography>
                    </Box>
                    <Chart
                      options={{
                        chart: {
                          toolbar: {
                            show: false,
                          },
                        },
                        stroke: {
                          curve: 'smooth',
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        xaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        yaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        grid: {
                          show: false,
                        },
                      }}
                      series={[
                        {
                          name: 'Adopted Animal',
                          data:
                            statistics.totalAdoptions !== undefined
                              ? statistics.totalAdoptions
                              : [],
                        },
                      ]}
                      type='area'
                    />
                  </Box>
                </Grid>
              </>
            ) : (
              <>
                <Grid xs={3}>
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.palette.neutral[50],
                      border: `solid 1px ${theme.palette.neutral[200]}`,
                    })}
                  >
                    <Box
                      sx={{
                        padding: '1rem',
                      }}
                    >
                      <Typography
                        level='body1'
                        sx={(theme) => ({
                          color: theme.palette.neutral[500],
                        })}
                      >
                        Total Animal
                      </Typography>
                      <Typography level='h4'>
                        {0}
                      </Typography>
                    </Box>
                    <Chart
                      options={{
                        chart: {
                          toolbar: {
                            show: false,
                          },
                        },
                        stroke: {
                          curve: 'smooth',
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        xaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        yaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        grid: {
                          show: false,
                        },
                      }}
                      series={[
                        {
                          name: 'Animal',
                          data:
                            [],
                        },
                      ]}
                      type='area'
                    />
                  </Box>
                </Grid>
                <Grid xs={3}>
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.palette.neutral[50],
                      border: `solid 1px ${theme.palette.neutral[200]}`,
                    })}
                  >
                    <Box
                      sx={{
                        padding: '1rem',
                      }}
                    >
                      <Typography
                        level='body1'
                        sx={(theme) => ({
                          color: theme.palette.neutral[500],
                        })}
                      >
                        Total Adopted Animal
                      </Typography>
                      <Typography level='h4'>
                        {0}
                      </Typography>
                    </Box>
                    <Chart
                      options={{
                        chart: {
                          toolbar: {
                            show: false,
                          },
                        },
                        stroke: {
                          curve: 'smooth',
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        xaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        yaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        grid: {
                          show: false,
                        },
                      }}
                      series={[
                        {
                          name: 'Adopted Animal',
                          data:
                            [],
                        },
                      ]}
                      type='area'
                    />
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Stack>
    </DashboardLayout>
  )
}
