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
const getAllSpeedySitesCached = unstable_cache(
  async (): Promise<SpeedySite[]> => {
    const url = buildSpeedyUrl('location/site/csv/100') // 100 = BG

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        userName: SPEEDY_USERNAME,
        password: SPEEDY_PASSWORD,
        language: SPEEDY_LANGUAGE ?? 'BG',
      }),
      cache: 'no-store',
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`Speedy CSV error ${res.status}: ${text}`)
    }

    const csv = await res.text()

    const lines = csv
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)

    // първият ред е header → пропускаме го
    const [, ...dataLines] = lines

    const sites: SpeedySite[] = dataLines.map((line, index) => {
      if (index < 5) {
        console.log(line, 'line')
      }

      const cols = line.split(',') // тук може да донастроиш според реалния формат

      const id = cols[0]
      const name = cols[5]
      const postCode = cols[11]
      const municipality = cols[6]
      const region = cols[9]

      return {
        id: Number(id),
        name,
        postCode: postCode || null,
        municipality: municipality || null,
        region: region || null,
      }
    })

    return sites
  },
  ['speedy-sites-all'],
  { revalidate: 60 * 60 * 24 }, // 24h
)

export async function getAllSpeedySitesAction() {
  return getAllSpeedySitesCached()
}

const getSpeedyOfficesCached = unstable_cache(
  async (siteId: number): Promise<SpeedyOffice[]> => {
    const rawOffices = await callSpeedy<SpeedyOfficeRaw[]>('location/office', { siteId })

    const resources = 'offices' in rawOffices ? rawOffices.offices : []

    return (resources as SpeedyOfficeRaw[]).map((o): SpeedyOffice => {
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
