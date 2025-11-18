// src/app/_actions/econt.ts
'use server'

import 'server-only'
import { EcontCitiesResponseRaw, EcontCity, EcontOffice, EcontOfficesResponseRaw } from '../types'
import { unstable_cache } from 'next/cache'

const { ECONT_BASE_URL, ECONT_USERNAME, ECONT_PASSWORD } = process.env

if (!ECONT_BASE_URL || !ECONT_USERNAME || !ECONT_PASSWORD) {
  throw new Error('Missing Econt env variables')
}

function buildEcontUrl(path: string) {
  const base = ECONT_BASE_URL!.replace(/\/$/, '')
  const cleanPath = path.replace(/^\//, '')
  return `${base}/${cleanPath}`
}

async function callEcont<T>(path: string, body: unknown): Promise<T> {
  const url = buildEcontUrl(path)

  const auth = Buffer.from(`${ECONT_USERNAME}:${ECONT_PASSWORD}`).toString('base64')

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(body ?? {}),
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Econt error ${res.status}: ${text}`)
  }

  return res.json() as Promise<T>
}
export async function getEcontCitiesRawAction(
  countryCode = process.env.ECONT_COUNTRY_CODE ?? 'BGR',
) {
  return callEcont<EcontCitiesResponseRaw>('Nomenclatures/NomenclaturesService.getCities.json', {
    countryCode,
  })
}

export async function getEcontOfficesRawAction(cityId: number) {
  if (!cityId) {
    throw new Error('cityId is required')
  }

  return callEcont<EcontOfficesResponseRaw>('Nomenclatures/NomenclaturesService.getOffices.json', {
    cityID: cityId,
  })
}

const getEcontCitiesCached = unstable_cache(
  async (countryCode: string): Promise<EcontCity[]> => {
    const raw = await callEcont<EcontCitiesResponseRaw>(
      'Nomenclatures/NomenclaturesService.getCities.json',
      { countryCode },
    )

    return (raw?.cities ?? [])
      .map(
        (c): EcontCity => ({
          id: c.id,
          name: c.name ?? '',
          postCode: c.postCode ?? null,
          regionName: c.regionName ?? null,
        }),
      )
      .filter((c) => c.name.trim().length > 0)
  },
  ['econt-cities'],
  { revalidate: 60 * 60 * 24 }, // 6 часа
)

export async function getEcontCitiesAction(countryCode = process.env.ECONT_COUNTRY_CODE ?? 'BGR') {
  return getEcontCitiesCached(countryCode)
}

const getEcontOfficesCached = unstable_cache(
  async (cityId: number): Promise<EcontOffice[]> => {
    const raw = await callEcont<EcontOfficesResponseRaw>(
      'Nomenclatures/NomenclaturesService.getOffices.json',
      { cityID: cityId },
    )

    return (raw?.offices ?? []).map((o): EcontOffice => {
      const workTime =
        o.workBegin || o.workEnd ? `${o.workBegin ?? ''} - ${o.workEnd ?? ''}`.trim() : null

      return {
        id: o.id,
        code: o.code,
        name: o.name,
        address: o.address ?? null,
        cityId: o.cityID,
        cityName: o.cityName ?? null,
        workTime,
        location: {
          lat: o.latitude ?? null,
          lng: o.longitude ?? null,
        },
      }
    })
  },
  ['econt-offices'],
  { revalidate: 60 * 60 * 6 },
)

export async function getEcontOfficesAction(cityId: number) {
  if (!cityId) throw new Error('cityId is required')
  return getEcontOfficesCached(cityId)
}
