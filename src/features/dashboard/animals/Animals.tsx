import DashboardLayout from '@/layouts/DashboardLayout'
import { faker } from '@faker-js/faker'
import {
  AspectRatio, Box,
  Button, Card,
  Grid, Input, Modal,
  ModalClose,
  ModalDialog, Textarea, Typography
} from '@mui/joy'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import wretch from 'wretch'
import AnimalInterface from './interfaces/AnimalInterface'

export default function Animals() {
  const navigate = useNavigate()

  // const [data, setData] = useState<AnimalInterface[]>([])
  const [data, updateData] = useReducer(
    (prev: AnimalInterface[], next: AnimalInterface) => {
      return [...prev, next]
    },
    []
  )
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

    Array.from({ length: 10 }).forEach(() => {
      const animalType = ['cat', 'dog'][faker.number.int({ min: 0, max: 1 })]

      updateData({
        id: faker.string.uuid(),
        name: faker.animal.dog(),
        age: faker.number.int({ min: 0, max: 1 }),
        gender: faker.person.sex(),
        type: animalType,
        breed: animalType === 'cat' ? faker.animal.cat() : faker.animal.dog(),
        description: faker.lorem.paragraph(),
        image: faker.image.urlLoremFlickr({ category: 'animals' }),
      })
    })
  }, [])

  useEffect(() => {
    const animal = data.find((animal) => animal.id === detail.id)

    if (detail.id && animal) {
      updateDetailData(animal)
    }
  }, [detail.id, data])

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
          <Grid xs={4} key={animal.id}>
            <Card variant='outlined'>
              <img
                src={animal.image}
                alt={animal.name}
                style={{ marginBottom: '1rem', borderRadius: '1rem' }}
              />
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
            <img src={detailData.image} alt={detailData.name} />
          </AspectRatio>
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
              onClick={() => setIsDetailEdited(false)}
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
