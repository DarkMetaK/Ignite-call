export function getWeekDays() {
  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
  const weekdaysArray = []

  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(1900, 0, i).toLocaleString(undefined, {
      weekday: 'long',
    })
    weekdaysArray.push(capitalizeFirstLetter(weekDay))
  }

  return weekdaysArray
}
