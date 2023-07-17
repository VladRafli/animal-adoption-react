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
  const [currentAnimalId, setCurrentAnimalId] = useState('')
  const [detail, setDetail] = useState(false)
  const [detailPhoto, setDetailPhoto] = useState(false)
  const [detailCertificate, setDetailCertificate] = useState(false)
  const [tempDetailData, updateTempDetailData] = useReducer(
    (prev: Partial<AnimalInterface>, next: Partial<AnimalInterface>) => {
      return { ...prev, ...next }
    },
    {}
  )
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
              photos: animal.animalPhoto,
              certificates: animal.animalCertificate,
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
              photos: animal.animalPhoto,
              certificates: animal.animalCertificate,
            }))
          )
        })
    }
  }, [])

  useEffect(() => {
    const animal = data.find((animal) => animal.id === currentAnimalId)

    if (currentAnimalId && animal) {
      updateDetailData(animal)
    }
  }, [currentAnimalId, data])

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
                onClick={() => {
                  setCurrentAnimalId(animal.id)
                  setDetail(true)
                }}
              >
                Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={detail}>
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
              setDetail(false)
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
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Button
                sx={{
                  width: '100%',
                }}
                onClick={() => {
                  setDetail(false)
                  setDetailPhoto(true)
                }}
              >
                See all photo
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button
                sx={{
                  width: '100%',
                }}
                onClick={() => {
                  setDetail(false)
                  setDetailCertificate(true)
                }}
              >
                See all certificates
              </Button>
            </Grid>
          </Grid>
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
            <>
              <Button
                variant='solid'
                onClick={() => {
                  setIsDetailEdited(false)
                  handleUpdate(currentAnimalId)
                }}
                sx={{
                  marginTop: '1rem',
                }}
              >
                Save
              </Button>
              <Button
                variant='solid'
                color='danger'
                onClick={() => {
                  updateDetailData(tempDetailData)
                  updateTempDetailData({})
                  setIsDetailEdited(false)
                }}
                sx={{
                  marginTop: '1rem',
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant='solid'
              onClick={() => {
                updateTempDetailData(detailData)
                setIsDetailEdited(true)
              }}
              sx={{
                marginTop: '1rem',
              }}
            >
              Edit
            </Button>
          )}
        </ModalDialog>
      </Modal>
      <Modal open={detailPhoto}>
        <ModalDialog
          sx={{
            width: 'calc(2 / 3 * 100vw)',
            height: 'calc(100vh - calc(2 * 1rem))',
            overflowY: 'scroll',
          }}
        >
          <ModalClose
            onClick={() => {
              setDetail(true)
              setDetailPhoto(false)
            }}
          />
          <Typography
            level='h1'
            sx={{
              marginBottom: '1rem',
            }}
          >
            Animal Photos
          </Typography>
          <Typography color='danger'>
            * photo can only be edited via mobile app
          </Typography>
          <Box>
            <Typography level='h3'>Full Body</Typography>
            <AspectRatio
              objectFit='contain'
              sx={{
                marginBottom: '1rem',
              }}
            >
              <img
                src={
                  detailData.photos?.find((val) => val.type === 'fullBody') !==
                  undefined
                    ? detailData.photos?.find((val) => val.type === 'fullBody')
                    : ''
                }
                alt='full body'
              />
            </AspectRatio>
          </Box>
          <Box>
            <Typography level='h3'>Head</Typography>
            <AspectRatio
              objectFit='contain'
              sx={{
                marginBottom: '1rem',
              }}
            >
              <img
                src={
                  detailData.photos?.find((val) => val.type === 'head') !==
                  undefined
                    ? detailData.photos?.find((val) => val.type === 'head')
                    : ''
                }
                alt='head'
              />
            </AspectRatio>
          </Box>
          <Box>
            <Typography level='h3'>Left Ear</Typography>
            <AspectRatio
              objectFit='contain'
              sx={{
                marginBottom: '1rem',
              }}
            >
              <img
                src={
                  detailData.photos?.find((val) => val.type === 'leftEar') !==
                  undefined
                    ? detailData.photos?.find((val) => val.type === 'leftEar')
                    : ''
                }
                alt='left ear'
              />
            </AspectRatio>
          </Box>
          <Box>
            <Typography level='h3'>Right Ear</Typography>
            <AspectRatio
              objectFit='contain'
              sx={{
                marginBottom: '1rem',
              }}
            >
              <img
                src={
                  detailData.photos?.find((val) => val.type === 'rightEar') !==
                  undefined
                    ? detailData.photos?.find((val) => val.type === 'rightEar')
                    : ''
                }
                alt='right ear'
              />
            </AspectRatio>
          </Box>
          <Box>
            <Typography level='h3'>Body</Typography>
            <AspectRatio
              objectFit='contain'
              sx={{
                marginBottom: '1rem',
              }}
            >
              <img
                src={
                  detailData.photos?.find((val) => val.type === 'body') !==
                  undefined
                    ? detailData.photos?.find((val) => val.type === 'body')
                    : ''
                }
                alt='body'
              />
            </AspectRatio>
          </Box>
          <Box>
            <Typography level='h3'>Tail</Typography>
            <AspectRatio
              objectFit='contain'
              sx={{
                marginBottom: '1rem',
              }}
            >
              <img
                src={
                  detailData.photos?.find((val) => val.type === 'tail') !==
                  undefined
                    ? detailData.photos?.find((val) => val.type === 'tail')
                    : ''
                }
                alt='tail'
              />
            </AspectRatio>
          </Box>
          <Box>
            <Typography level='h3'>Front Left Feet</Typography>
            <AspectRatio
              objectFit='contain'
              sx={{
                marginBottom: '1rem',
              }}
            >
              <img
                src={
                  detailData.photos?.find(
                    (val) => val.type === 'frontLeftFeet'
                  ) !== undefined
                    ? detailData.photos?.find(
                        (val) => val.type === 'frontLeftFeet'
                      )
                    : ''
                }
                alt='frontLeftFeet'
              />
            </AspectRatio>
          </Box>
          <Box>
            <Typography level='h3'>Front Right Feet</Typography>
            <AspectRatio
              objectFit='contain'
              sx={{
                marginBottom: '1rem',
              }}
            >
              <img
                src={
                  detailData.photos?.find(
                    (val) => val.type === 'frontRightFeet'
                  ) !== undefined
                    ? detailData.photos?.find(
                        (val) => val.type === 'frontRightFeet'
                      )
                    : ''
                }
                alt='frontRightFeet'
              />
            </AspectRatio>
          </Box>
          <Box>
            <Typography level='h3'>Back Left Feet</Typography>
            <AspectRatio
              objectFit='contain'
              sx={{
                marginBottom: '1rem',
              }}
            >
              <img
                src={
                  detailData.photos?.find(
                    (val) => val.type === 'backLeftFeet'
                  ) !== undefined
                    ? detailData.photos?.find(
                        (val) => val.type === 'backLeftFeet'
                      )
                    : ''
                }
                alt='backLeftFeet'
              />
            </AspectRatio>
          </Box>
          <Box>
            <Typography level='h3'>Back Right Feet</Typography>
            <AspectRatio
              objectFit='contain'
              sx={{
                marginBottom: '1rem',
              }}
            >
              <img
                src={
                  detailData.photos?.find(
                    (val) => val.type === 'backRightFeet'
                  ) !== undefined
                    ? detailData.photos?.find(
                        (val) => val.type === 'backRightFeet'
                      )
                    : ''
                }
                alt='backRightFeet'
              />
            </AspectRatio>
          </Box>
        </ModalDialog>
      </Modal>
      <Modal open={detailCertificate}>
        <ModalDialog
          sx={{
            width: 'calc(2 / 3 * 100vw)',
            height: 'calc(100vh - calc(2 * 1rem))',
            overflowY: 'scroll',
          }}
        >
          <ModalClose
            onClick={() => {
              setDetail(true)
              setDetailCertificate(false)
            }}
          />
          <Typography
            level='h1'
            sx={{
              marginBottom: '1rem',
            }}
          >
            Animal Certificates
          </Typography>
          {detailData.certificates === undefined ? '' : 'No certificate uploaded'}
          {detailData.certificates?.map((certificate, index) => (
            <Box key={index}>
              <Typography level='h3'>Back Right Feet</Typography>
              <AspectRatio
                objectFit='contain'
                sx={{
                  marginBottom: '1rem',
                }}
              >
                <img
                  src={
                    certificate.path !== undefined ? certificate.path : ''
                  }
                  alt={certificate.type}
                />
              </AspectRatio>
            </Box>
          ))}
        </ModalDialog>
      </Modal>
    </DashboardLayout>
  )
}
