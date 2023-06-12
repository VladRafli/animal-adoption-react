import { userAtom } from '@/data/user'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Delete, Edit } from '@mui/icons-material'
import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Stack,
  Textarea,
  Tooltip,
  Typography,
} from '@mui/joy'
import { useAtom } from 'jotai'
import type { MRT_ColumnDef } from 'material-react-table'
import MaterialReactTable, {
  MaterialReactTableProps,
} from 'material-react-table'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import wretch from 'wretch'
import UserInterface from './interfaces/UserInterface'

export default function Users() {
  const navigate = useNavigate()

  const [user] = useAtom(userAtom)

  const [data, setData] = useState<UserInterface[]>([])
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editedUser, setEditedUser] = useReducer(
    (state: any, newState: any) => ({
      ...state,
      ...newState,
    }),
    {
      email: '',
      password: '',
      role: '',
      name: '',
      number: '',
      address: '',
    }
  )

  const columns: MRT_ColumnDef<UserInterface>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'password',
      header: 'Password',
    },
    {
      accessorKey: 'role',
      header: 'Role',
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
      accessorKey: 'address',
      header: 'Address',
    },
  ]

  const handleEditRow = () => {
    wretch(`${import.meta.env.VITE_API_URL}/v1/users/${editedUser.id}`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .put({
        email: editedUser.email,
        password: editedUser.password !== '' ? editedUser.password : undefined,
        role: editedUser.role,
        name: editedUser.name,
        number: editedUser.number,
        address: editedUser.address,
      })

    wretch(`${import.meta.env.VITE_API_URL}/v1/users`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .get()
      .json((res) => setData(res.data))

    setEditModal(false)
  }

  const handleDeleteRow = () => {
    wretch(`${import.meta.env.VITE_API_URL}/v1/users/${editedUser.id}`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .delete()

    wretch(`${import.meta.env.VITE_API_URL}/v1/users`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .get()
      .json((res) => setData(res.data))

    setDeleteModal(false)
  }

  const handleRefreshData = () => {
    wretch(`${import.meta.env.VITE_API_URL}/v1/users`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .get()
      .json((res) => setData(res.data))
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

    wretch(`${import.meta.env.VITE_API_URL}/v1/users`)
      .options({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        mode: 'cors',
      })
      .get()
      .json((res) => setData(res.data))
  }, [])

  return (
    <DashboardLayout>
      <Typography
        level='h1'
        sx={{
          marginBottom: '1rem',
        }}
      >
        User List
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
            <Tooltip arrow placement='left' title='Edit'>
              <IconButton
                onClick={() => {
                  setEditedUser({
                    id: row.getValue('id'),
                    email: row.getValue('email'),
                    role: row.getValue('role'),
                    name: row.getValue('name'),
                    number: row.getValue('number'),
                    address: row.getValue('address'),
                  })
                  setEditModal(true)
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement='right' title='Delete'>
              <IconButton
                onClick={() => {
                  setEditedUser({
                    id: row.getValue('id'),
                    email: row.getValue('email'),
                    role: row.getValue('role'),
                    name: row.getValue('name'),
                    number: row.getValue('number'),
                    address: row.getValue('address'),
                  })
                  setDeleteModal(true)
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
      {/* Edit Modal */}
      {editModal ? (
        <Modal open={editModal} onClose={() => setEditModal(false)}>
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
                User Profile
              </Typography>
              <Typography level='body1'>
                Change user profile information
              </Typography>
              <Stack direction='column' spacing={2}>
                <Input
                  variant='outlined'
                  type='text'
                  placeholder='Email'
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ email: e.target.value })}
                />
                <Input
                  variant='outlined'
                  type='text'
                  placeholder='Password'
                  value={editedUser.password}
                  onChange={(e) => setEditedUser({ password: e.target.value })}
                />
                <Input
                  variant='outlined'
                  type='text'
                  placeholder='Name'
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ name: e.target.value })}
                />
                <Input
                  variant='outlined'
                  type='text'
                  placeholder='Phone Number'
                  value={editedUser.number}
                  onChange={(e) => setEditedUser({ number: e.target.value })}
                />
                <Textarea
                  variant='outlined'
                  color='neutral'
                  minRows={2}
                  placeholder='Address'
                  value={editedUser.address}
                  onChange={(e) => setEditedUser({ address: e.target.value })}
                />
                <Select placeholder='Select Role' defaultValue={user.role}>
                  <Option value='admin'>Admin</Option>
                  <Option value='shelter'>Shelter</Option>
                  <Option value='adopter'>Adopter</Option>
                </Select>
                <Button variant='solid' color='primary' onClick={handleEditRow}>
                  Save
                </Button>
              </Stack>
            </Stack>
          </ModalDialog>
        </Modal>
      ) : (
        ''
      )}
      {/* Delete Modal */}
      {deleteModal ? (
        <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
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
              <Typography level='h3' fontSize='3xl'>
                Are you want to delete this user? This action cannot be undone.
              </Typography>
              <Button variant='solid' color='danger' onClick={handleDeleteRow}>
                Yes
              </Button>
              <Button
                variant='solid'
                color='neutral'
                onClick={() => setDeleteModal(false)}
              >
                No
              </Button>
            </Stack>
          </ModalDialog>
        </Modal>
      ) : (
        ''
      )}
    </DashboardLayout>
  )
}
