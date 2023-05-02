import DashboardLayout from '@/layouts/DashboardLayout'
import { Box, Grid, Stack, Typography } from '@mui/joy'
import Chart from 'react-apexcharts'

export default function Home() {
  return (
    <DashboardLayout>
      <Stack spacing={2}>
        <Box>
          <Typography level='h2'>Dashboard</Typography>
        </Box>
        <Box>
          <Grid container columnSpacing={2}>
            <Grid xs={3}>
              <Box
                sx={(theme) => ({
                  backgroundColor: theme.palette.neutral[50],
                  border: `solid 1px ${theme.palette.neutral[200]}`,
                })}
              >
                <Box sx={{
                  padding: '1rem'
                }}>
                  <Typography
                    level='body1'
                    sx={(theme) => ({
                      color: theme.palette.neutral[500],
                    })}
                  >
                    Total Users
                  </Typography>
                  <Typography level='h4'>132</Typography>
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
                      data: [0, 5, 12, 18, 32, 68, 97, 132],
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
                <Box sx={{
                  padding: '1rem'
                }}>
                  <Typography
                    level='body1'
                    sx={(theme) => ({
                      color: theme.palette.neutral[500],
                    })}
                  >
                    Total Animal
                  </Typography>
                  <Typography level='h4'>402</Typography>
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
                      data: [0, 10, 26, 47, 89, 151, 254, 402],
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
                <Box sx={{
                  padding: '1rem'
                }}>
                  <Typography
                    level='body1'
                    sx={(theme) => ({
                      color: theme.palette.neutral[500],
                    })}
                  >
                    Total Shelters
                  </Typography>
                  <Typography level='h4'>28</Typography>
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
                      data: [0, 2, 5, 12, 17, 20, 23, 28],
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
                <Box sx={{
                  padding: '1rem'
                }}>
                  <Typography
                    level='body1'
                    sx={(theme) => ({
                      color: theme.palette.neutral[500],
                    })}
                  >
                    Total Adopted Animal
                  </Typography>
                  <Typography level='h4'>132</Typography>
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
                      data: [0, 3, 10, 24, 46, 75, 87, 121],
                    },
                  ]}
                  type='area'
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </DashboardLayout>
  )
}
