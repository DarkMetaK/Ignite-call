import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { CaretLeft, CaretRight } from 'phosphor-react'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { getWeekDays } from '@/utils/get-week-days'
import { capitalizeString } from '@/utils/capitalize-string'
import { api } from '@/lib/axios'

const weekdays = getWeekDays('short')

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

interface BlockedDates {
  blockedWeekDays: number[]
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const router = useRouter()
  const { username } = router.query

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const dateMonth = capitalizeString(currentDate.format('MMMM'))
  const dateYear = currentDate.format('YYYY')

  const { data: blockedDates } = useQuery<BlockedDates>(
    ['blocked-dates', currentDate.get('year'), currentDate.get('month')],
    async () => {
      const response = await api.get(
        `/users/${String(username)}/blocked-dates`,
        {
          params: {
            year: currentDate.get('year'),
            month: currentDate.get('month'),
          },
        },
      )
      return response.data
    },
  )

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return []
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')
    const lastWeekDay = daysInMonthArray[daysInMonthArray.length - 1].get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return daysInMonthArray[daysInMonthArray.length - (i + 1)].add(
        i + (i + 1),
        'day',
      )
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            blockedDates.blockedWeekDays.includes(date.get('day')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = []
    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7))
    }

    return calendarWeeks.map((weekDays, index) => {
      return { weekDays, week: index + 1 }
    })
  }, [currentDate, blockedDates])

  function handleNextMonth() {
    setCurrentDate((state) => state.add(1, 'month'))
  }

  function handlePreviousMonth() {
    setCurrentDate((state) => state.subtract(1, 'month'))
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {dateMonth} <span>{dateYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous Month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next Month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {weekdays.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ weekDays, week }) => (
            <tr key={week}>
              {weekDays.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <CalendarDay
                    disabled={disabled}
                    onClick={() => onDateSelected(date.toDate())}
                  >
                    {date.get('date')}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
