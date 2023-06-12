import DashboardLayout from '@/layouts/DashboardLayout'
import { Delete, KeyOff } from '@mui/icons-material'
import { Box, IconButton, Tooltip, Typography } from '@mui/joy'
import type { MRT_ColumnDef } from 'material-react-table'
import MaterialReactTable from 'material-react-table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import wretch from 'wretch'
import TokenInterface from './interfaces/TokenInterface'

export default function Tokens() {
  const navigate = useNavigate()

  const [data, setData] = useState<TokenInterface[]>([])

  const columns: MRT_ColumnDef<TokenInterface>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'name',
      header: 'Username',
    },
    {
      accessorKey: 'token',
      header: 'Token',
    },
    {
      accessorKey: 'revokedAt',
      header: 'Revoked At',
    },
  ]

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

    wretch(`${import.meta.env.VITE_API_URL}/v1/tokens`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .get()
      .json((res) => {
        setData(res.data)
      })
  }, [])

  const handleRevokeToken = (id: string) => {
    if (
      window.confirm('Are you sure you want to revoke this token?') === false
    ) {
      return
    }

    wretch(`${import.meta.env.VITE_API_URL}/v1/tokens/${id}`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .post({ id })
      .json((res) => {
        alert(res.message)
      })
  }

  return (
    <DashboardLayout>
      <Typography
        level='h1'
        sx={{
          marginBottom: '1rem',
        }}
      >
        Refresh Token List
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement='right' title='Revoke Token'>
              <IconButton
                onClick={() => {
                  handleRevokeToken(row.id)
                }}
              >
                <KeyOff />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </DashboardLayout>
  )
}
