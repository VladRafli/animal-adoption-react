import ChangePassword from '@/features/auth/change-password/ChangePassword'
import ForgotPassword from '@/features/auth/forgot-password/ForgotPassword'
import Login from '@/features/auth/login/Login'
import Register from '@/features/auth/register/Register'
import Adoptions from '@/features/dashboard/adoptions/Adoptions'
import Animals from '@/features/dashboard/animals/Animals'
import Home from '@/features/dashboard/home/Home'
import Tokens from '@/features/dashboard/tokens/Tokens'
import Users from '@/features/dashboard/users/Users'
import Index from '@/features/index/Index'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/auth',
    element: <Navigate to='/auth/login' replace={true} />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/register',
    element: <Register />,
  },
  {
    path: '/auth/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/auth/change-password',
    element: <ChangePassword />,
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
  {
    path: '/refresh-tokens',
    element: <Tokens />,
  },
])

export default router
