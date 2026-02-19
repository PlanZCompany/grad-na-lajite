import React from 'react'
import { getCachedGlobal } from '@/utils/getGlobals'

import type { Header } from '@/payload-types'
import HeaderClient from './Component.client'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function Header() {
  const payload = await getPayload({ config })
  const now = new Date().toISOString()

  const staticHeaderDataMobile = await payload
    .find({
      collection: 'headerBanner',
      limit: 1,
      sort: 'order',
      where: {
        and: [
          {
            isActive: {
              equals: true,
            },
          },
          {
            placement: {
              equals: 'header_static',
            },
          },
          { showOnMobile: { equals: true } },
          {
            or: [
              {
                startDate: {
                  exists: false,
                },
              },
              {
                startDate: {
                  equals: null,
                },
              },
              {
                startDate: {
                  less_than_equal: now,
                },
              },
            ],
          },
          {
            or: [
              {
                endDate: {
                  exists: false,
                },
              },
              {
                endDate: {
                  equals: null,
                },
              },
              {
                endDate: {
                  greater_than_equal: now,
                },
              },
            ],
          },
        ],
      },
    })
    .then((response) => response?.docs?.[0] || null)

  const staticHeaderDataDesktop = await payload
    .find({
      collection: 'headerBanner',
      limit: 1,
      sort: 'order',
      where: {
        and: [
          {
            isActive: {
              equals: true,
            },
          },
          {
            placement: {
              equals: 'header_static',
            },
          },
          { showOnDesktop: { equals: true } },
          {
            or: [
              {
                startDate: {
                  exists: false,
                },
              },
              {
                startDate: {
                  equals: null,
                },
              },
              {
                startDate: {
                  less_than_equal: now,
                },
              },
            ],
          },
          {
            or: [
              {
                endDate: {
                  exists: false,
                },
              },
              {
                endDate: {
                  equals: null,
                },
              },
              {
                endDate: {
                  greater_than_equal: now,
                },
              },
            ],
          },
        ],
      },
    })
    .then((response) => response?.docs?.[0] || null)

  const rotatingHeaderBannersMobile = await payload
    .find({
      collection: 'headerBanner',
      sort: 'order',
      where: {
        and: [
          {
            isActive: {
              equals: true,
            },
          },
          {
            placement: {
              equals: 'header_rotating',
            },
          },
          { showOnMobile: { equals: true } },
          {
            or: [
              {
                startDate: {
                  exists: false,
                },
              },
              {
                startDate: {
                  equals: null,
                },
              },
              {
                startDate: {
                  less_than_equal: now,
                },
              },
            ],
          },
          {
            or: [
              {
                endDate: {
                  exists: false,
                },
              },
              {
                endDate: {
                  equals: null,
                },
              },
              {
                endDate: {
                  greater_than_equal: now,
                },
              },
            ],
          },
        ],
      },
    })
    .then((response) => response?.docs || [])

  const rotatingHeaderBannersDesktop = await payload
    .find({
      collection: 'headerBanner',
      sort: 'order',
      where: {
        and: [
          {
            isActive: {
              equals: true,
            },
          },
          {
            placement: {
              equals: 'header_rotating',
            },
          },
          { showOnDesktop: { equals: true } },
          {
            or: [
              {
                startDate: {
                  exists: false,
                },
              },
              {
                startDate: {
                  equals: null,
                },
              },
              {
                startDate: {
                  less_than_equal: now,
                },
              },
            ],
          },
          {
            or: [
              {
                endDate: {
                  exists: false,
                },
              },
              {
                endDate: {
                  equals: null,
                },
              },
              {
                endDate: {
                  greater_than_equal: now,
                },
              },
            ],
          },
        ],
      },
    })
    .then((response) => response?.docs || [])

  const headerData = (await getCachedGlobal('header', 1)()) as Header

  return (
    <HeaderClient
      headerData={headerData}
      staticBannerMobile={staticHeaderDataMobile}
      staticBannerDesktop={staticHeaderDataDesktop}
      rotatingBannersMobile={rotatingHeaderBannersMobile}
      rotatingBannersDesktop={rotatingHeaderBannersDesktop}
    />
  )
}
