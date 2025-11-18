export interface BoxnowDestinationRaw {
  id: string
  name: string
  city: string
  postcode?: string
  address: string
  latitude?: number
  longitude?: number
  isActive?: boolean
  // ... тук може да има още полета, които не ни трябват
}

export interface BoxnowLocker {
  id: string
  name: string
  city: string
  postcode: string | null
  address: string
  location: {
    lat: number | null
    lng: number | null
  }
}
