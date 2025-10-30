// app/(auth)/_actions/register.ts
'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function registerUser(values: {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber?: string
  dateOfBirth?: string
}) {
  const payload = await getPayload({ config })

  const user = await payload.create({
    collection: 'users',
    data: {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber ?? '',
      dateOfBirth: values.dateOfBirth ?? null,
      email: values.email.toLowerCase(),
      password: values.password,
      role: 'user',
    },
  })

  return { ok: true, message: 'Check your email to verify your account.', user: user }
}
