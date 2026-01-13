import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  //need to delete current subscription by email
  const subscription = await payload.find({
    collection: 'subscriptions',
    where: { email: { equals: email.toLowerCase() } },
  })

  if (subscription.docs.length > 0) {
    await payload.delete({
      collection: 'subscriptions',
      id: subscription.docs[0].id,
    })

    //need to update user
    await payload.update({
      collection: 'users',
      where: { email: { equals: email.toLowerCase() } },
      data: { subscribed: false },
    })
  }

  const redirectUrl = new URL('/', request.url)
  redirectUrl.searchParams.set('unsubscribed', '1')

  return NextResponse.redirect(redirectUrl.toString(), 302)
}
