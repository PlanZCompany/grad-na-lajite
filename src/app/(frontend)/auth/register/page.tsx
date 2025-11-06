import { RegisterComponent } from '@/components/Auth'
import { AuthWrapper } from '@/components/Wrappers'
import React from 'react'

const Register = () => {
  return (
    <AuthWrapper>
      <RegisterComponent />
    </AuthWrapper>
  )
}

export default Register
