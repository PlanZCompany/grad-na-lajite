export const addSubscribeValueToCookie = (action: 'add' | 'delete') => {
  // need to add value in cookie did the user it is subscribed, expired in 1 year
  const itIsBrowser = typeof window !== 'undefined'

  if (!itIsBrowser) return

  if (action === 'delete') {
    document.cookie = 'GNL-subscribed=;' + 'path=/'
    return
  }

  const date = new Date()
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000) // 1 year
  const expires = 'expires=' + date.toUTCString()
  document.cookie = 'GNL-subscribed=' + 'true' + ';' + expires + ';path=/'
}

export const didUserItIsSubscribedInCookie = () => {
  const itIsBrowser = typeof window !== 'undefined'

  if (!itIsBrowser) return false

  const cookie = document.cookie
  return cookie.includes('GNL-subscribed=true')
}
