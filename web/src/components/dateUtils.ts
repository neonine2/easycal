export interface SimpleDate {
  dayCode: number
  dateStr: string
}

export function getHoursFromMidnight(time: string) {
  const [hoursStr, minutesStr] = time.split(':')
  return Number(hoursStr) + Number(minutesStr) / 60
}

export function getTimeStr(date: Date) {
  const utc_hours = date.getUTCHours()
  const utc_minutes = date.getUTCMinutes()
  const tz_offset_hours = Math.floor(date.getTimezoneOffset() / 60)
  const tz_offset_minutes = Math.floor(date.getTimezoneOffset() % 60)
  const hours = String(
    ((utc_hours - tz_offset_hours) % 24) +
      (utc_hours - tz_offset_hours < 0 ? 24 : 0)
  )
  const minutes = String(
    ((utc_minutes - tz_offset_minutes) % 60) +
      (utc_minutes - tz_offset_minutes < 0 ? 60 : 0)
  )
  return hours + ':' + minutes
}

export function getDateStr(date: Date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const yyyy = String(date.getFullYear())

  return mm + '/' + dd + '/' + yyyy
}

export function StrToDate(datestr: string) {
  const [mm, dd, yyyy] = datestr.split('/')
  const date = new Date()
  date.setHours(12)
  date.setDate(Number(dd))
  date.setMonth(Number(mm) - 1)
  date.setFullYear(Number(yyyy))
  return date
}

export function shiftDate(date: Date, days: number) {
  const MILLIS_PER_DAY = 1000 * 60 * 60 * 24
  const dateCopy = new Date(date.getTime())
  dateCopy.setHours(12) // avoid issues if daylight savings takes place
  return new Date(dateCopy.getTime() + days * MILLIS_PER_DAY)
}

export function formatDay(day: number, format = 'short') {
  const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dayNamesLong = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  return format == 'short' ? dayNamesShort[day] : dayNamesLong[day]
}

export const getDayFromDateStr = (datestr: string, format = 'long') => {
  const test = StrToDate(datestr)
  console.log(test.getDay())
  return getDayStr(StrToDate(datestr), format)
}

export const shiftDateStr = (datestr: string, days: number) =>
  getDateStr(shiftDate(StrToDate(datestr), days))

export const getTimeNowStr = () => getTimeStr(new Date())

export const getTodayDateStr = () => getDateStr(new Date())

export const getTodaySimpleDate = () => getDateStr(new Date())

export const getDayStr = (date: Date, format = 'long') => {
  return formatDay(date.getDay(), format)
}
