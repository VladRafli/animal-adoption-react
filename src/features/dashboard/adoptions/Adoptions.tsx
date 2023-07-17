import { userAtom } from '@/data/user'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Chat, Check, Clear, WhatsApp } from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Tooltip,
  Typography,
} from '@mui/joy'
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
  const [chatModal, setChatModal] = useState(false)
  const [chatRecieverId, setChatRecieverId] = useState('')
  const [chatRoomId, setChatRoomId] = useState('')
  const [chats, setChats] = useState<any[]>([])
  const [message, setMessage] = useState('')

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
                  userId: val.userId,
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
                userId: val.userId,
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
                  userId: val.userId,
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
                userId: val.userId,
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
    setData([])

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
              userId: val.userId,
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
            userId: val.userId,
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

  const handleChat = () => {
    setChats([])

    wretch(`${import.meta.env.VITE_API_URL}/v1/chats/${chatRecieverId}`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .get()
      .json((res) => {
        setChatRoomId(res.data.id)
        setChats(res.data.chat)
      })
  }

  const handleSendChat = () => {
    wretch(`${import.meta.env.VITE_API_URL}/v1/chats/`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .post({
        chatRoomId,
        to: chatRecieverId,
        message,
      })
      .res(() => {
        setMessage('')
        handleChat()
      })
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
              userId: val.userId,
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
            userId: val.userId,
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
            {row.getValue('status') !== 'finished' &&
              row.getValue('status') !== 'rejected' && (
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
                        const convertedNumber = `+62${data[
                          row.index
                        ].number.slice(1, data[row.index].number.length)}`

                        window.open(`https://wa.me/${convertedNumber}`)
                      }}
                      disabled={data[row.index].number !== undefined}
                    >
                      <WhatsApp />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement='right' title='Message'>
                    <IconButton
                      onClick={() => {
                        console.log(data[row.index])
                        setChatModal(true)
                        setChatRecieverId(data[row.index].userId)
                        handleChat()
                      }}
                    >
                      <Chat />
                    </IconButton>
                  </Tooltip>
                </>
              )}
          </Box>
        )}
      />
      <Modal open={chatModal} onClose={() => setChatModal(false)}>
        <ModalDialog
          sx={{
            width: 'calc(2 / 3 * 100vw)',
            height: 'calc(100vh - calc(2 * 1rem))',
          }}
        >
          <ModalClose />
          <Typography sx={{ marginBottom: '1rem' }} level='h1'>
            Chat
          </Typography>
          <Button sx={{ marginBottom: '1rem' }} onClick={handleChat}>
            Refresh Chat
          </Button>
          <Box
            sx={{
              height: 'calc(100% - 2rem)',
              padding: '1rem',
              position: 'relative',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '1rem',
              overflowY: 'scroll',
            }}
          >
            {chats.length > 0 ? (
              chats.map((val, index) => (
                <Box
                  sx={{
                    margin: '1rem 0',
                    display: 'flex',
                    flexDirection:
                      val.sender.name === user.name ? 'row-reverse' : 'row',
                    gap: '1rem',
                  }}
                  key={index}
                >
                  <Box
                    sx={{
                      padding: '1rem 2rem',
                      backgroundColor: 'white',
                      borderRadius: '1rem',
                    }}
                  >
                    <Typography level='h5'>{val.sender.name}</Typography>
                    <Typography level='body1'>{val.message}</Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography level='h5'>No chat yet</Typography>
            )}
            <Grid
              sx={{
                width: 'calc(100% - 1rem)',
                position: 'absolute',
                bottom: '1rem',
              }}
              container
              spacing={2}
            >
              <Grid xs={10}>
                <Input
                  placeholder='Enter message'
                  size='md'
                  variant='outlined'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid xs={2}>
                <Button
                  sx={{ width: '100%' }}
                  variant='solid'
                  color='primary'
                  onClick={handleSendChat}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ModalDialog>
      </Modal>
    </DashboardLayout>
  )
}
