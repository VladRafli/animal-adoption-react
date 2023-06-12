import { userAtom } from '@/data/user'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Check, Clear, WhatsApp } from '@mui/icons-material'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/joy'
import { useAtom } from 'jotai'
import type { MRT_ColumnDef } from 'material-react-table'
import MaterialReactTable from 'material-react-table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import wretch from 'wretch'
import TransactionInterface from './interfaces/TransactionInterface'

export default function Adoptions() {
  const navigate = useNavigate()

  const [user] = useAtom(userAtom)

  const [data, setData] = useState<TransactionInterface[]>([])
  const [acceptModal, setAcceptModal] = useState(false)
  const [rejectModal, setRejectModal] = useState(false)

  const columns: MRT_ColumnDef<TransactionInterface>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'number',
      header: 'Phone Number',
    },
    {
      accessorKey: 'animalName',
      header: 'Animal Name',
    },
    {
      accessorKey: 'age',
      header: 'Age',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'breed',
      header: 'Breed',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
  ]

  const handleAllowEditTransaction = (status: string) => {
    if (status === 'recieved' || status === 'review') {
      return false
    }
    return true
  }

  const handleAcceptTransaction = (id: string, status: string) => {
    const nextStatusTransactionMap = new Map([
      ['recieved', 'review'],
      ['review', 'wfc'],
      ['delivery', 'finsihsed'],
    ])

    wretch(`${import.meta.env.VITE_API_URL}/v1/transactions/${id}`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .put({ status: nextStatusTransactionMap.get(status) })
      .json(() => {
        if (user.role === 'admin') {
          wretch(`${import.meta.env.VITE_API_URL}/v1/transactions`)
            .options({
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
              mode: 'cors',
            })
            .get()
            .json((res) =>
              setData(
                res.data.map((val: any) => ({
                  id: val.id,
                  name: val.user.name,
                  number: val.user.number,
                  animalName: val.animal.name,
                  age: val.animal.age,
                  gender: val.animal.gender,
                  breed: val.animal.breed,
                  status: val.status,
                }))
              )
            )
          return
        }

        wretch(`${import.meta.env.VITE_API_URL}/v1/transactions?shelter=true`)
          .options({
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            mode: 'cors',
          })
          .get()
          .json((res) =>
            setData(
              res.data.map((val: any) => ({
                id: val.id,
                name: val.user.name,
                number: val.user.number,
                animalName: val.animal.name,
                age: val.animal.age,
                gender: val.animal.gender,
                breed: val.animal.breed,
                status: val.status,
              }))
            )
          )
      })
  }

  const handleRejectTransaction = (id: string) => {
    wretch(`${import.meta.env.VITE_API_URL}/v1/transactions/${id}`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .put({ status: 'rejected' })
      .json(() => {
        if (user.role === 'admin') {
          wretch(`${import.meta.env.VITE_API_URL}/v1/transactions`)
            .options({
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
              mode: 'cors',
            })
            .get()
            .json((res) =>
              setData(
                res.data.map((val: any) => ({
                  id: val.id,
                  name: val.user.name,
                  number: val.user.number,
                  animalName: val.animal.name,
                  age: val.animal.age,
                  gender: val.animal.gender,
                  breed: val.animal.breed,
                  status: val.status,
                }))
              )
            )
          return
        }

        wretch(`${import.meta.env.VITE_API_URL}/v1/transactions?shelter=true`)
          .options({
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            mode: 'cors',
          })
          .get()
          .json((res) =>
            setData(
              res.data.map((val: any) => ({
                id: val.id,
                name: val.user.name,
                number: val.user.number,
                animalName: val.animal.name,
                age: val.animal.age,
                gender: val.animal.gender,
                breed: val.animal.breed,
                status: val.status,
              }))
            )
          )
      })
  }

  const handleRefreshData = () => {
    if (user.role === 'admin') {
      wretch(`${import.meta.env.VITE_API_URL}/v1/transactions`)
        .options({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          mode: 'cors',
        })
        .get()
        .json((res) =>
          setData(
            res.data.map((val: any) => ({
              id: val.id,
              name: val.user.name,
              number: val.user.number,
              animalName: val.animal.name,
              age: val.animal.age,
              gender: val.animal.gender,
              breed: val.animal.breed,
              status: val.status,
            }))
          )
        )
      return
    }

    wretch(`${import.meta.env.VITE_API_URL}/v1/transactions?shelter=true`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .get()
      .json((res) =>
        setData(
          res.data.map((val: any) => ({
            id: val.id,
            name: val.user.name,
            number: val.user.number,
            animalName: val.animal.name,
            age: val.animal.age,
            gender: val.animal.gender,
            breed: val.animal.breed,
            status: val.status,
          }))
        )
      )
  }

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

    if (user.role === 'admin') {
      wretch(`${import.meta.env.VITE_API_URL}/v1/transactions`)
        .options({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          mode: 'cors',
        })
        .get()
        .json((res) =>
          setData(
            res.data.map((val: any) => ({
              id: val.id,
              name: val.user.name,
              number: val.user.number,
              animalName: val.animal.name,
              age: val.animal.age,
              gender: val.animal.gender,
              breed: val.animal.breed,
              status: val.status,
            }))
          )
        )
      return
    }

    wretch(`${import.meta.env.VITE_API_URL}/v1/transactions?shelter=true`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .get()
      .json((res) =>
        setData(
          res.data.map((val: any) => ({
            id: val.id,
            name: val.user.name,
            number: val.user.number,
            animalName: val.animal.name,
            age: val.animal.age,
            gender: val.animal.gender,
            breed: val.animal.breed,
            status: val.status,
          }))
        )
      )
  }, [])

  return (
    <DashboardLayout>
      <Typography
        level='h1'
        sx={{
          marginBottom: '1rem',
        }}
      >
        Adoption List
      </Typography>
      <Button
        variant='solid'
        color='primary'
        onClick={() => handleRefreshData}
        sx={{
          marginBottom: '1rem',
        }}
      >
        Refresh Data
      </Button>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnOrdering
        enableEditing
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            {row.getValue('status') !== 'finished' && row.getValue('status') !== 'rejected' && (
              <>
                <Tooltip arrow placement='left' title='Accept'>
                  <IconButton
                    onClick={() => {
                      handleAcceptTransaction(
                        row.getValue('id'),
                        row.getValue('status')
                      )
                    }}
                    disabled={handleAllowEditTransaction(
                      row.getValue('status')
                    )}
                  >
                    <Check />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement='right' title='Reject'>
                  <IconButton
                    onClick={() => {
                      handleRejectTransaction(row.getValue('id'))
                    }}
                    disabled={handleAllowEditTransaction(
                      row.getValue('status')
                    )}
                  >
                    <Clear />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement='right' title='Message'>
                  <IconButton
                    onClick={() => {
                      const convertedNumber = `+62${data[row.index].number.slice(1, data[row.index].number.length)}`

                      window.open(`https://wa.me/${convertedNumber}`)
                    }}
                  >
                    <WhatsApp />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        )}
      />
    </DashboardLayout>
  )
}
