import { LoginComponent } from '@/components/Auth'
import { AuthWrapper } from '@/components/Wrappers'
import React from 'react'

const Login = () => {
  return (
    <AuthWrapper>
      <LoginComponent />
    </AuthWrapper>
  )
}

export default Login
