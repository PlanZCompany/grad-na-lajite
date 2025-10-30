const LAT2CYR: [string, string][] = [
  ['sht', 'щ'],
  ['sht', 'щ'],
  ['sh', 'ш'],
  ['ch', 'ч'],
  ['ts', 'ц'],
  ['zh', 'ж'],
  ['yu', 'ю'],
  ['ya', 'я'],
  ['yo', 'йо'],
  ['a', 'а'],
  ['b', 'б'],
  ['v', 'в'],
  ['g', 'г'],
  ['d', 'д'],
  ['e', 'е'],
  ['z', 'з'],
  ['i', 'и'],
  ['y', 'й'],
  ['k', 'к'],
  ['l', 'л'],
  ['m', 'м'],
  ['n', 'н'],
  ['o', 'о'],
  ['p', 'п'],
  ['r', 'р'],
  ['s', 'с'],
  ['t', 'т'],
  ['u', 'у'],
  ['f', 'ф'],
  ['h', 'х'],
  ['c', 'ц'],
  ['q', 'я'],
  ['w', 'в'],
  ['x', 'кс'],
]

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
]

export function latinToCyrillic(input: string): string {
  let s = input.normalize('NFC')
  // process digraphs first (case-insensitive)
  for (const [lat, cyr] of LAT2CYR.sort((a, b) => b[0].length - a[0].length)) {
    const re = new RegExp(lat, 'gi')
    s = s.replace(re, (m) => matchCase(cyr, m))
  }
  return s
}

export function cyrillicToLatin(input: string): string {
  let s = input.normalize('NFC')
  for (const [cyr, lat] of CYR2LAT.sort((a, b) => b[0].length - a[0].length)) {
    const re = new RegExp(cyr, 'gi')
    s = s.replace(re, (m) => matchCase(lat, m))
  }
  return s
}

function matchCase(replacement: string, sample: string): string {
  if (sample.toUpperCase() === sample) return replacement.toUpperCase()
  if (sample[0].toUpperCase() === sample[0]) {
    return replacement[0].toUpperCase() + replacement.slice(1)
  }
  return replacement
}

export function containsQuery(bulgarianText: string, userQuery: string): boolean {
  const text = bulgarianText.normalize('NFC')
  const textLat = cyrillicToLatin(text).toLowerCase()

  const q = userQuery.trim()
  const qLat = q.toLowerCase()
  const qCyr = latinToCyrillic(q).toLowerCase()

  return text.toLowerCase().includes(qCyr) || textLat.includes(qLat)
}
