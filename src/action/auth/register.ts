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

  //first I need to find in "subscriptions" if the email exists
  const subscription = await payload.find({
    collection: 'subscriptions',
    where: { email: { equals: values.email.toLowerCase() } },
  })

  const isSubscribed = subscription.docs.length > 0

  const user = await payload.create({
    collection: 'users',
    data: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email.toLowerCase(),
      password: values.password,
      phoneNumber: values.phoneNumber,
      role: 'user',
      subscribed: isSubscribed,
      discountCode: isSubscribed ? subscription.docs[0].discountCode : null,
    },
  })

  return { ok: true, message: 'Check your email to verify your account.', user: user }
}
