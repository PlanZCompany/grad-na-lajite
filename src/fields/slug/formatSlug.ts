import type { FieldHook } from 'payload'

const CYR2LAT: [string, string][] = [
  ['щ', 'sht'],
  ['ш', 'sh'],
  ['ч', 'ch'],
  ['ц', 'ts'],
  ['ж', 'zh'],
  ['ю', 'yu'],
  ['я', 'ya'],
  ['йо', 'yo'],
  ['й', 'y'],
  ['а', 'a'],
  ['б', 'b'],
  ['в', 'v'],
  ['г', 'g'],
  ['д', 'd'],
  ['е', 'e'],
  ['з', 'z'],
  ['и', 'i'],
  ['к', 'k'],
  ['л', 'l'],
  ['м', 'm'],
  ['н', 'n'],
  ['о', 'o'],
  ['п', 'p'],
  ['р', 'r'],
  ['с', 's'],
  ['т', 't'],
  ['у', 'u'],
  ['ф', 'f'],
  ['х', 'h'],
  ['ъ', 'y'],
  ['ь', 'y'],
]

const formatSlugToEn = (val: string): string => {
  const slug = val
    .replaceAll(' - ', ' ')
    .replace(/ /g, '-')
    .replaceAll("'", '')
    .replaceAll('"', '')
    .replaceAll('„', '')
    .replaceAll('“', '')
    .toLowerCase()

  const mapOfSlug = slug.split('').map((char) => {
    for (let i = 0; i < CYR2LAT.length; i++) {
      if (char === CYR2LAT[i][0]) {
        return CYR2LAT[i][1]
      }
    }
    return char
  })

  return mapOfSlug.join('')
}

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
