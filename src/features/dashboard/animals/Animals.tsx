import { userAtom } from '@/data/user'
import DashboardLayout from '@/layouts/DashboardLayout'
import { faker } from '@faker-js/faker'
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Textarea,
  Typography,
} from '@mui/joy'
import { useAtom } from 'jotai'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import wretch from 'wretch'
import AnimalInterface from './interfaces/AnimalInterface'

export default function Animals() {
  const navigate = useNavigate()

  const [user] = useAtom(userAtom)

  const [data, setData] = useState<AnimalInterface[]>([])
  // const [data, updateData] = useReducer(
  //   (prev: AnimalInterface[], next: AnimalInterface) => {
  //     return [...prev, next]
  //   },
  //   []
  // )
  // const [detail, setDetail] = useState({ isOpen: false, id: '' })
  const [detail, updateDetail] = useReducer(
    (
      prev: { isOpen: boolean; id: string },
      next: { isOpen: boolean; id: string }
    ) => {
      return { ...prev, ...next }
    },
    { isOpen: false, id: '' }
  )
  // const [detailData, setDetailData] = useState<AnimalInterface>()
  const [detailData, updateDetailData] = useReducer(
    (prev: Partial<AnimalInterface>, next: Partial<AnimalInterface>) => {
      return { ...prev, ...next }
    },
    {}
  )
  const [isDetailEdited, setIsDetailEdited] = useState(false)

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
      wretch(`${import.meta.env.VITE_API_URL}/v1/animal`)
        .options({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          mode: 'cors',
        })
        .get()
        .json((res) => {
          setData(
            res.data.map((animal: any) => ({
              id: animal.id,
              name: animal.name,
              age: animal.age,
              gender: animal.gender,
              type: animal.animalType.name,
              breed: animal.breed,
              description: animal.description,
              image: animal.animalPhoto.find(
                (val: any) => val.type === 'fullBody'
              ),
            }))
          )
        })
    } else {
      wretch(`${import.meta.env.VITE_API_URL}/v1/animal?shelter=true`)
        .options({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          mode: 'cors',
        })
        .get()
        .json((res) => {
          setData(
            res.data.map((animal: any) => ({
              id: animal.id,
              name: animal.name,
              age: animal.age,
              gender: animal.gender,
              type: animal.animalType.name,
              breed: animal.breed,
              description: animal.description,
              image: animal.animalPhoto.find(
                (val: any) => val.type === 'fullBody'
              ),
            }))
          )
        })
    }
  }, [])

  useEffect(() => {
    const animal = data.find((animal) => animal.id === detail.id)

    if (detail.id && animal) {
      updateDetailData(animal)
    }
  }, [detail.id, data])

  const handleUpdate = (id: string) => {
    const animal = data.find((animal) => animal.id === id)

    if (animal) {
      wretch(`${import.meta.env.VITE_API_URL}/v1/animal/${id}`)
        .options({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          mode: 'cors',
        })
        .put({
          name: detailData.name,
          age: detailData.age,
          gender: detailData.gender,
          breed: detailData.breed,
          description: detailData.description,
        })

      wretch(`${import.meta.env.VITE_API_URL}/v1/animal`)
        .options({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          mode: 'cors',
        })
        .get()
        .json((res) => {
          setData(
            res.data.map((animal: any) => ({
              id: animal.id,
              name: animal.name,
              age: animal.age,
              gender: animal.gender,
              type: animal.animalType.name,
              breed: animal.breed,
              description: animal.description,
              image: animal.animalPhoto.find(
                (val: any) => val.type === 'fullBody'
              ),
            }))
          )
        })
    }
  }

  return (
    <DashboardLayout>
      <Typography
        level='h1'
        sx={{
          marginBottom: '1rem',
        }}
      >
        Animals List
      </Typography>
      <Grid container spacing={2}>
        {data.map((animal, index) => (
          <Grid xs={6} key={index}>
            <Card variant='outlined'>
              <AspectRatio
                objectFit='contain'
                sx={{
                  width: '360px',
                  marginBottom: '1rem',
                }}
              >
                <img
                  src={animal.image !== undefined ? animal.image.path : ''}
                  alt={animal.name}
                  style={{
                    marginBottom: '1rem',
                    borderRadius: '1rem',
                  }}
                />
              </AspectRatio>
              <Typography
                sx={{
                  marginBottom: '1rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {animal.name}
              </Typography>
              <Button
                variant='solid'
                onClick={() => updateDetail({ isOpen: true, id: animal.id })}
              >
                Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={detail.isOpen}>
        <ModalDialog
          sx={{
            width: 'calc(2 / 3 * 100vw)',
            height: 'calc(100vh - calc(2 * 1rem))',
            overflowY: 'scroll',
          }}
        >
          <ModalClose
            onClick={() => {
              setIsDetailEdited(false)
              updateDetailData({})
              updateDetail({ isOpen: false, id: '' })
            }}
          />
          <Typography
            level='h1'
            sx={{
              marginBottom: '1rem',
            }}
          >
            {detailData.name}
          </Typography>
          <AspectRatio
            objectFit='contain'
            sx={{
              marginBottom: '1rem',
            }}
          >
            <img
              src={detailData.image !== undefined ? detailData.image.path : ''}
              alt={detailData.name}
            />
          </AspectRatio>
          <Box>
            <label htmlFor='age'>Name</label>
            <Input
              variant='outlined'
              id='name'
              value={detailData.name}
              onChange={(e) => updateDetailData({ name: e.target.value })}
              disabled={!isDetailEdited}
            />
          </Box>
          <Box>
            <label htmlFor='age'>Age</label>
            <Input
              variant='outlined'
              id='age'
              value={detailData.age}
              onChange={(e) => updateDetailData({ age: +e.target.value })}
              disabled={!isDetailEdited}
            />
          </Box>
          <Box>
            <label htmlFor='gender'>Gender</label>
            <Input
              variant='outlined'
              id='gender'
              value={detailData.gender}
              onChange={(e) => updateDetailData({ gender: e.target.value })}
              disabled={!isDetailEdited}
            />
          </Box>
          <Box>
            <label htmlFor='type'>Type</label>
            <Input
              variant='outlined'
              id='type'
              value={detailData.type}
              onChange={(e) => updateDetailData({ type: e.target.value })}
              disabled={!isDetailEdited}
            />
          </Box>
          <Box>
            <label htmlFor='breed'>Breed</label>
            <Input
              variant='outlined'
              id='breed'
              value={detailData.breed}
              onChange={(e) => updateDetailData({ breed: e.target.value })}
              disabled={!isDetailEdited}
            />
          </Box>
          <Box>
            <label htmlFor='description'>Description</label>
            <Textarea
              variant='outlined'
              minRows={2}
              id='description'
              value={detailData.description}
              onChange={(e) =>
                updateDetailData({ description: e.target.value })
              }
              disabled={!isDetailEdited}
            />
          </Box>
          {isDetailEdited ? (
            <Button
              variant='solid'
              onClick={() => {
                setIsDetailEdited(false)
                handleUpdate(detail.id)
              }}
              sx={{
                marginTop: '1rem',
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              variant='solid'
              onClick={() => setIsDetailEdited(true)}
              sx={{
                marginTop: '1rem',
              }}
            >
              Edit
            </Button>
          )}
        </ModalDialog>
      </Modal>
    </DashboardLayout>
  )
}
