// src/lib/email/buildEmail.ts
import { EmailTemplate } from '@/payload-types'
import type { PayloadRequest } from 'payload'

type Data = Record<string, any>

function getByPath(obj: any, path: string) {
  return path.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), obj)
}

function interpolate(input: string, data: Data): string {
  return (input || '').replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (_m, key: string) => {
    const val = getByPath(data, key)
    return val === undefined || val === null ? '' : String(val)
  })
}

function resolveMediaUrl(media: any): string {
  if (!media) return ''
  if (typeof media === 'string') return ''
  return media.url || ''
}

export async function buildEmail(args: {
  req: PayloadRequest
  templateId: number
  data?: Data
}): Promise<{ subject: string; html: string }> {
  const { req, templateId } = args
  const data = args.data ?? {}

  const settings = await req.payload.findGlobal({
    slug: 'email-settings',
    req,
    depth: 2,
  })

  const template = await req.payload.findByID({
    collection: 'email-templates',
    id: templateId,
    req,
    depth: 2,
  })

  const subject = interpolate(template.subject ?? '', data)
  const preheader = template.preheader ? interpolate(template.preheader, data) : ''

  const bodyHTML = renderTemplateSections(template, settings, data)

  const html = wrapEmailLayout({
    settings,
    preheader,
    bodyHTML,
  })

  return { subject, html }
}

function renderTemplateSections(template: EmailTemplate, settings: any, data: Data): string {
  const parts: string[] = []

  // HERO
  if (template.hero) {
    const heroImg = resolveMediaUrl(template.hero.image)
    if (heroImg) {
      parts.push(`
        <div style="text-align:center;margin:0 0 18px;">
          <img src="${heroImg}" width="520" alt="${interpolate(template.hero.imageAlt ?? '', data)}"
            style="display:block;border:0;max-width:520px;width:100%;height:auto;margin:0 auto;">
        </div>
      `)
    }

    if (template.hero.title) {
      parts.push(`
        <h1 style="margin:0 0 20px;font-family:'Merriweather',Georgia,serif;font-size:24px;color:#F5C34D;">
          ${interpolate(template.hero.title, data)}
        </h1>
      `)
    }

    if (template.hero.text) {
      parts.push(`
        <p style="margin:0 0 20px;font-family:'Merriweather',Georgia,serif;font-size:16px;line-height:1.6;color:#EDE8F5;">
          ${interpolate(template.hero.text, data).replace(/\n/g, '<br>')}
        </p>
      `)
    }

    if (template.hero.primaryCta?.label && template.hero.primaryCta?.url) {
      parts.push(
        renderPrimaryButton(
          interpolate(template.hero.primaryCta.url, data),
          interpolate(template.hero.primaryCta.label, data),
        ),
      )
    }

    parts.push(renderDivider())
  }

  // INFO BLOCKS (1–3)
  if (Array.isArray(template.infoBlocks) && template.infoBlocks.length) {
    for (let i = 0; i < template.infoBlocks.length; i++) {
      const b = template.infoBlocks[i]
      parts.push(renderInfoBlock(b, data))
      if (i !== template.infoBlocks.length - 1) parts.push(renderDivider())
    }
    parts.push(renderDivider())
  }

  // PROMO
  if (template.promo?.enabled) {
    parts.push(renderPromoBlock(template.promo, data))
    parts.push(renderDivider())
  }

  // SECONDARY CTA
  if (template.secondaryCta?.enabled) {
    if (template.secondaryCta.introText) {
      parts.push(`
        <p style="margin:0 0 14px;font-family:'Merriweather',Georgia,serif;font-size:14px;line-height:1.6;color:#B9ACC8;">
          ${interpolate(template.secondaryCta.introText, data)}
        </p>
      `)
    }
    if (template.secondaryCta.button?.label && template.secondaryCta.button?.url) {
      parts.push(
        renderSecondaryButton(
          interpolate(template.secondaryCta.button.url, data),
          interpolate(template.secondaryCta.button.label, data),
        ),
      )
    }
    parts.push(renderDivider())
  }

  // COMMUNITY (ползваме Global)
  parts.push(renderCommunityBlock(settings, data))

  return parts.join('')
}

function renderDivider(): string {
  return `<div style="height:1px;background:#2E1A47;opacity:.9;margin:22px 0;"></div>`
}

function renderPrimaryButton(url: string, label: string): string {
  return `
    <table align="center" cellspacing="0" cellpadding="0" style="margin:20px 0 30px;">
      <tr><td style="border-radius:6px;" bgcolor="#F5C34D">
        <a href="${url}" target="_blank"
          style="display:inline-block;padding:14px 28px;font-family:'Merriweather',Georgia,serif;font-size:16px;font-weight:700;
          text-decoration:none;color:#1A0F26;background:#F5C34D;border-radius:6px;">
          ${label}
        </a>
      </td></tr>
    </table>
  `
}

function renderSecondaryButton(url: string, label: string): string {
  return `
    <table align="center" cellspacing="0" cellpadding="0" style="margin:12px 0 26px;">
      <tr><td style="border-radius:6px;border:1px solid #F5C34D;" bgcolor="#15121B">
        <a href="${url}" target="_blank"
          style="display:inline-block;padding:12px 22px;font-family:'Merriweather',Georgia,serif;font-size:15px;font-weight:700;
          text-decoration:none;color:#F5C34D;background:#15121B;border-radius:6px;">
          ${label}
        </a>
      </td></tr>
    </table>
  `
}

function renderInfoBlock(block: any, data: Data): string {
  const icon = resolveMediaUrl(block.icon)
  const title = interpolate(block.title ?? '', data)
  const text = interpolate(block.text ?? '', data).replace(/\n/g, '<br>')
  const linkLabel = block.link?.label ? interpolate(block.link.label, data) : ''
  const linkUrl = block.link?.url ? interpolate(block.link.url, data) : ''

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
      style="background:#1E1825;border:1px solid #2E1A47;border-radius:6px;">
      <tr>
        <td style="padding:16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              ${
                icon
                  ? `
              <td valign="top" style="width:40px;padding-right:12px;">
                <img src="${icon}" width="32" alt="${interpolate(block.iconAlt ?? '', data)}"
                  style="display:block;border:0;max-width:32px;height:auto;">
              </td>`
                  : ''
              }
              <td valign="top">
                <div style="font-family:'Merriweather',Georgia,serif;font-size:16px;color:#E8C468;font-weight:700;margin:0 0 8px;">
                  ${title}
                </div>
                <div style="font-family:'Merriweather',Georgia,serif;font-size:15px;line-height:1.7;color:#EDE8F5;">
                  ${text}
                </div>
                ${
                  linkLabel && linkUrl
                    ? `
                <div style="margin-top:10px;font-family:'Merriweather',Georgia,serif;font-size:12px;">
                  <a href="${linkUrl}" target="_blank" style="color:#F5C34D;text-decoration:underline;">
                    ${linkLabel}
                  </a>
                </div>`
                    : ''
                }
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
}

function renderPromoBlock(promo: any, data: Data): string {
  const icon = resolveMediaUrl(promo.icon)
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
      style="background:#1E1825;border:1px dashed #F5C34D;border-radius:6px;">
      <tr>
        <td style="padding:16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              ${
                icon
                  ? `
              <td valign="top" style="width:40px;padding-right:12px;">
                <img src="${icon}" width="32" alt="${interpolate(promo.iconAlt ?? '', data)}"
                  style="display:block;border:0;max-width:32px;height:auto;">
              </td>`
                  : ''
              }
              <td valign="top">
                <div style="font-family:'Merriweather',Georgia,serif;font-size:16px;color:#F5C34D;font-weight:800;margin:0 0 6px;">
                  ${interpolate(promo.codeName ?? '', data)}
                </div>
                <div style="font-family:'Merriweather',Georgia,serif;font-size:14px;color:#E8C468;font-weight:700;margin:0 0 8px;">
                  ${interpolate(promo.discountText ?? '', data)}
                </div>
                <div style="font-family:'Merriweather',Georgia,serif;font-size:14px;line-height:1.6;color:#EDE8F5;">
                  ${interpolate(promo.instructionText ?? '', data)}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
}

function renderCommunityBlock(settings: any, data: Data): string {
  const intro = interpolate(settings.communityIntroText ?? '', data)
  const links = Array.isArray(settings.socialLinks) ? settings.socialLinks : []
  const ugc = resolveMediaUrl(settings.ugcImage)
  const ugcAlt = interpolate(settings.ugcAlt ?? '', data)

  if (!intro && !links.length && !ugc) return ''

  const linksHtml = links.length
    ? links
        .map((l: any) => {
          const url = interpolate(l.url ?? '', data)
          const label = (l.platform ?? '').toString()
          return `<a href="${url}" target="_blank" style="color:#F5C34D;text-decoration:underline;margin:0 10px;font-family:'Merriweather',Georgia,serif;font-size:12px;">${label}</a>`
        })
        .join('')
    : ''

  return `
    ${renderDivider()}
    ${intro ? `<div style="font-family:'Merriweather',Georgia,serif;font-size:14px;color:#B9ACC8;line-height:1.6;margin:0 0 12px;">${intro}</div>` : ''}
    ${linksHtml ? `<div style="text-align:center;margin:0 0 14px;">${linksHtml}</div>` : ''}
    ${
      ugc
        ? `
      <div style="text-align:center;margin-top:10px;">
        <img src="${ugc}" width="220" alt="${ugcAlt}" style="display:inline-block;border:0;max-width:220px;height:auto;">
      </div>
    `
        : ''
    }
  `
}

function wrapEmailLayout(args: { settings: any; preheader: string; bodyHTML: string }): string {
  const { settings, preheader, bodyHTML } = args

  const siteUrl = settings.siteUrl ?? '#'
  const logoUrl = resolveMediaUrl(settings.logo)
  const logoAlt = settings.logoAlt ?? 'Град на Лъжите'

  const contactEmail = settings.contactEmail ?? ''
  const unsubscribeUrl = settings.unsubscribeUrl ?? '*|UNSUB|*'
  const termsUrl = settings.termsUrl ?? ''
  const privacyUrl = settings.privacyUrl ?? ''
  const flavorText = settings.flavorText ?? ''

  return `<!doctype html>
<html lang="bg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @media only screen and (max-width:600px){
      .container{width:100%!important;}
      .p-body{padding:24px 20px!important;}
      .btn{display:block!important;width:100%!important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#0E0B12;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>` : ''}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0E0B12;">
    <tr><td align="center">
      <table role="presentation" width="600" class="container" cellspacing="0" cellpadding="0" border="0" style="width:600px;max-width:600px;margin:0 auto;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1A0F26 0%,#3C1D1D 100%);padding:20px;">
            <table role="presentation" width="100%">
              <tr>
                <td align="left" valign="middle" style="width:50%;">
                  <a href="${siteUrl}" target="_blank">
                    ${logoUrl ? `<img src="${logoUrl}" width="140" alt="${logoAlt}" style="display:block;border:0;max-width:140px;">` : ''}
                  </a>
                </td>
                <td align="right" valign="middle" style="width:50%;">
                  <!-- ако искаш tagline, сложи го в template body като paragraph -->
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="p-body" style="background:#15121B;padding:36px 40px;">
            ${bodyHTML}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#15121B;padding:22px 26px;border-top:1px solid #2E1A47;">
            ${flavorText ? `<div style="font-family:'Merriweather',Georgia,serif;font-size:12px;color:#B9ACC8;line-height:1.6;margin:0 0 10px;">${flavorText}</div>` : ''}

            <div style="font-family:'Merriweather',Georgia,serif;font-size:11px;color:#887C97;opacity:.8;line-height:1.6;">
              ${contactEmail ? `Контакт: <a href="mailto:${contactEmail}" style="color:#F5C34D;text-decoration:underline;">${contactEmail}</a><br>` : ''}
              ${termsUrl ? `<a href="${termsUrl}" style="color:#F5C34D;text-decoration:underline;">Общи условия</a> ` : ''}
              ${privacyUrl ? `· <a href="${privacyUrl}" style="color:#F5C34D;text-decoration:underline;">Политика за поверителност</a>` : ''}
              <br>
              <a href="${unsubscribeUrl}" style="color:#F5C34D;text-decoration:underline;">Отписване</a>
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
