'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildEmailCustom } from '@/lib/email/buildEmailCustom'

export default async function sendConfirmResetPasswordMail(email: string) {
  const payload = await getPayload({ config: configPromise })

  try {
    const { subject, html } = await buildEmailCustom({
      templateSlug: 'password_changed',
      userEmail: email,
    })

    await payload.sendEmail({
      to: email,
      subject,
      html,
      text: html,
    })
  } catch (emailErr) {
    console.error('subscription email error:', emailErr)
  }
}
