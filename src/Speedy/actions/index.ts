'use server'

import 'server-only'
import { unstable_cache } from 'next/cache'
import { SpeedyOffice, SpeedyOfficeRaw, SpeedySite, SpeedySiteRaw } from '../types'

const { SPEEDY_BASE_URL, SPEEDY_USERNAME, SPEEDY_PASSWORD, SPEEDY_LANGUAGE } = process.env

if (!SPEEDY_BASE_URL || !SPEEDY_USERNAME || !SPEEDY_PASSWORD) {
  throw new Error('Missing Speedy env variables')
}

function buildSpeedyUrl(path: string) {
  const base = SPEEDY_BASE_URL!.replace(/\/$/, '')
  const cleanPath = path.replace(/^\//, '')
  return `${base}/${cleanPath}`
}

export async function callSpeedy<T>(path: string, body: Record<string, unknown> = {}): Promise<T> {
  const url = buildSpeedyUrl(path)

  const payload = {
    userName: SPEEDY_USERNAME,
    password: SPEEDY_PASSWORD,
    language: SPEEDY_LANGUAGE ?? 'BG',
    ...body,
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Speedy error ${res.status}: ${text}`)
  }

  return res.json() as Promise<T>
}
const getSpeedySitesCached = unstable_cache(
  async (): Promise<SpeedySite[]> => {
    // TODO: ако Speedy API изисква задължително name, можеш да пробваш с празен string или специален флаг.
    const rawSites = await callSpeedy<SpeedySiteRaw[]>('location/site', {
      countryId: 100,
      // name: ''  // -> ако API-то изисква поле name
    })

    if (!('sites' in rawSites)) return []

    const resources: any = 'sites' in rawSites ? rawSites.sites : []

    return !!resources.length
      ? resources.map(
          (s: any): SpeedySite => ({
            id: s.id,
            name: s.name,
            postCode: s.postCode ?? null,
            municipality: s.municipality ?? null,
            region: s.region ?? null,
          }),
        )
      : []
  },
  ['speedy-sites'],
  {
    revalidate: 60 * 60 * 24, // 24ч
  },
)

export async function getSpeedySitesAction(): Promise<SpeedySite[]> {
  return getSpeedySitesCached()
}

const getSpeedyOfficesCached = unstable_cache(
  async (siteId: number): Promise<SpeedyOffice[]> => {
    const rawOffices = await callSpeedy<SpeedyOfficeRaw[]>('location/office', { siteId })

    return (rawOffices ?? []).map((o): SpeedyOffice => {
      const workTime =
        o.workTimeFrom || o.workTimeTo
          ? `${o.workTimeFrom ?? ''} - ${o.workTimeTo ?? ''}`.trim()
          : null

      return {
        id: o.id,
        siteId: o.siteId,
        name: o.name,
        address: o.address,
        workTime,
        location: {
          lat: o.latitude ?? null,
          lng: o.longitude ?? null,
        },
      }
    })
  },
  ['speedy-offices'],
  {
    revalidate: 60 * 60 * 6,
  },
)

export async function getSpeedyOfficesAction(siteId: number): Promise<SpeedyOffice[]> {
  if (!siteId) throw new Error('siteId is required')
  return getSpeedyOfficesCached(siteId)
}
