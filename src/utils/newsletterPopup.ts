// src/utils/newsletterPopup.ts
export const LS_DISMISSED = 'gl_newsletter_dismissed_until_v1'
export const LS_SUBSCRIBED = 'gl_newsletter_subscribed_until_v1'
export const LS_LOCK = 'gl_newsletter_popup_lock_v1'

const DAY = 86_400_000

export const DISMISS_DAYS = 7
export const SUB_DAYS = 365

export const POPUP_DELAY_MS = 1500
export const LOCK_BLOCK_MS = 30_000

export function getTs(key: string): number {
  const v = Number(localStorage.getItem(key) || 0)
  return Number.isFinite(v) ? v : 0
}

export function isActive(key: string): boolean {
  return Date.now() < getTs(key)
}

export function setForDays(key: string, days: number): void {
  localStorage.setItem(key, String(Date.now() + days * DAY))
}

export function setLockNow(): void {
  localStorage.setItem(LS_LOCK, String(Date.now()))
}

export function isLocked(): boolean {
  const lockTs = getTs(LS_LOCK)
  return Date.now() - lockTs < LOCK_BLOCK_MS
}
