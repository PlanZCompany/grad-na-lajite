import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

/**
 * Checks if the given date (YYYY-MM-DD) is in the current ISO week.
 */
export function isInCurrentWeek(dateStr: string): boolean {
  const inputDate = dayjs(dateStr, 'YYYY-MM-DD')
  const today = dayjs()

  return inputDate.isoWeek() === today.isoWeek() && inputDate.year() === today.year()
}
