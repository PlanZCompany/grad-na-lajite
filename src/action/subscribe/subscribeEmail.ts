'use server'

import { buildSubscriptionEmail } from '@/emails/subscription'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function subscribeEmail(
  email: string,
  userName?: string,
  discountCodeToReturn?: string,
) {
  const payload = await getPayload({ config: configPromise })

  try {
    const siteName = 'Град на лъжите'
    const siteUrl = `https://gradnalajite.bg`
    const logoUrl = `${siteUrl}/static/preview.png`
    const supportEmail = 'noreply@gradnalajite.bg'
    const recipient = email
    const displayName = userName || undefined // if you have user.name, pass it instead
    const code = discountCodeToReturn || '' // if you only send when you have a code, guard below

    const { subject, html, text } = buildSubscriptionEmail({
      toEmail: recipient,
      name: displayName,
      discountCode: code,
      logoUrl,
      siteName,
      siteUrl,
      supportEmail,
    })

    await payload.sendEmail({
      to: recipient,
      subject,
      html,
      text,
      from: supportEmail,
    })
  } catch (emailErr) {
    console.error('subscription email error:', emailErr)
  }
}
