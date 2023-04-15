import { capitalizeString } from './capitalize-string'

export function getWeekDays(format: 'long' | 'short' = 'long') {
  const weekdaysArray = []

  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(1900, 0, i).toLocaleString(undefined, {
      weekday: format,
    })
    if (format === 'long') {
      weekdaysArray.push(capitalizeString(weekDay))
    } else {
      weekdaysArray.push(weekDay.toUpperCase())
    }
  }

  return weekdaysArray
}
