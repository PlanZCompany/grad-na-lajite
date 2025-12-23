import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  await payload.update({
    collection: 'order',
    id,
    data: { status: 'cancelled' },
  })

  const redirectUrl = new URL('/', request.url)
  redirectUrl.searchParams.set('cancelled', '1')

  return NextResponse.redirect(redirectUrl.toString(), 302)
}
