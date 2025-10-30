import { site } from 'site.config'

export const abs = (path = '') => `${site.url}${path.replace(/^\//, '')}`
