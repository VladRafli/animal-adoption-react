import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/features/auth/login/Login'
import Home from '@/features/dashboard/home/Home'
import Users from '@/features/dashboard/users/Users'
import Animals from '@/features/dashboard/animals/Animals'
import Adoptions from '@/features/dashboard/adoptions/Adoptions'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/auth/login' replace={true} />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Home />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/animals',
    element: <Animals />,
  },
  {
    path: '/adoptions',
    element: <Adoptions />,
  },
])

export default router
