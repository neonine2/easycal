/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  getTodayDateStr,
  getDayFromDateStr,
  shiftDateStr,
  getHoursFromMidnight,
} from './dateUtils'

const TodayLabel = () => (
  <div className="todayLabel">
    <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
        fill="#ed2e38"
      />
    </svg>
    Today
  </div>
)

function Day({ dateStr, selected, onClick }) {
  return (
    <div className="day-wrap">
      <div
        className={'day' + ' ' + (selected ? 'day-selected' : '')}
        onClick={(e) => {
          e.stopPropagation()
          onClick(!selected)
        }}
      >
        <span
          className={selected ? 'day-name-selected' : 'day-name-unselected'}
        >
          {getDayFromDateStr(dateStr, 'short')}
        </span>
        {dateStr == getTodayDateStr() && <TodayLabel />}
        <span
          className={selected ? 'day-date-selected' : 'day-date-unselected'}
        >
          {dateStr.split('/').slice(0, 2).join('/')}
        </span>
      </div>
    </div>
  )
}

const eventData = [
  { id: 31, title: 'Breakfast with Tony', startTime: '7:00', endTime: '9:00' },
  {
    id: 21,
    title: 'Call with Hong Kong Office',
    startTime: '8:30',
    endTime: '9:30',
  },
  { id: 35, title: 'Vendor Call', startTime: '9:00', endTime: '10:00' },
  { id: 42, title: 'Afternoon Tea', startTime: '15:00', endTime: '17:00' },
  { id: 45, title: 'Sales Presentation', startTime: '15:00', endTime: '17:00' },
  { id: 47, title: 'Haircut', startTime: '16:00', endTime: '17:00' },
  {
    id: 13,
    title: 'Coffee Chat with Marcus',
    startTime: '15:00',
    endTime: '15:30',
  },
  { id: 56, title: 'Dinner with Sue', startTime: '19:00', endTime: '21:00' },
]

function checkEventsOverlap(evt1, evt2) {
  console.log(evt1, evt2)
  const startTime1 = Number(evt1.startTime.split(':').join(''))
  const startTime2 = Number(evt2.startTime.split(':').join(''))
  const endTime1 = Number(evt1.endTime.split(':').join(''))
  const endTime2 = Number(evt2.endTime.split(':').join(''))
  const out =
    (startTime2 > startTime1 && startTime2 < endTime1) ||
    (startTime1 > startTime2 && startTime1 < endTime2) ||
    startTime1 == startTime2 ||
    endTime1 == endTime2
  console.log(out)
  return out
}

function findHorzPosnGap(sortedArr) {
  console.log(sortedArr)
  if (sortedArr[0] > 1) {
    return { isGap: true, horzPosn: 1 }
  } else if (sortedArr.length == 1) {
    return { isGap: false, horzPosn: 2 }
  } else {
    let i = 0
    while (i < sortedArr.length - 1 && sortedArr[i + 1] - sortedArr[i] == 1) {
      i += 1
    }
    return { isGap: i < sortedArr.length - 1, horzPosn: sortedArr[i] + 1 }
  }
}

function compareEvents(evt1, evt2) {
  const startTime1 = Number(evt1.startTime.split(':').join(''))
  const startTime2 = Number(evt2.startTime.split(':').join(''))
  const endTime1 = Number(evt1.endTime.split(':').join(''))
  const endTime2 = Number(evt2.endTime.split(':').join(''))
  if (startTime1 != startTime2) {
    return startTime1 < startTime2 ? -1 : +1
  } else {
    return endTime1 < endTime2 ? -1 : +1
  }
}

function arrangeEvents(events = eventData) {
  const eventsCopy = events.map((evt) => {
    return { ...evt, nOverlaps: 0, horzPosn: 1 }
  })
  eventsCopy.sort((evt1, evt2) => compareEvents(evt1, evt2))
  for (let thisIdx = 0; thisIdx < eventsCopy.length; thisIdx++) {
    // Find the earliest event that still overlaps with this event.
    let predecessorIdx = thisIdx - 1
    while (
      predecessorIdx >= 0 &&
      checkEventsOverlap(eventsCopy[thisIdx], eventsCopy[predecessorIdx])
    ) {
      predecessorIdx -= 1
    }
    // Then all events between the earliest overlapping event and this
    // event also overlap with this event AND among each other.

    // Increment nOverlap of all overlapping predecessors by 1.
    // Set horzPosn to be the first number either within the horzPosn's
    // of predecessorIdx + 1, ..., idx-1 OR the first number after.
    // Set nOverlap of this event to the # of overlapping predecessors.

    // Check if there is any overlap at all.
    if (predecessorIdx + 1 < thisIdx) {
      const horzPosnArr = []
      for (let otherIdx = predecessorIdx + 1; otherIdx < thisIdx; otherIdx++) {
        horzPosnArr.push(eventsCopy[otherIdx].horzPosn)
      }
      const gapData = findHorzPosnGap(
        horzPosnArr.sort((a, b) => (a < b ? -1 : 1))
      )
      eventsCopy[thisIdx].horzPosn = gapData.horzPosn
      // update nOverlaps in case there is no suitable gap
      if (!gapData.isGap) {
        // increment overlaps of the predecessor events
        for (
          let otherIdx = predecessorIdx + 1;
          otherIdx < thisIdx;
          otherIdx++
        ) {
          eventsCopy[otherIdx].nOverlaps += 1
        }
      }
      eventsCopy[thisIdx].nOverlaps = thisIdx - (predecessorIdx + 1)
    }
  }

  // At the end, compute width of each event as (100 / nOverlaps)%.
  return eventsCopy
}

function getDurationHrs(startTime: string, endTime: string) {
  const [startHoursStr, startMinutesStr] = startTime.split(':')
  const [endHoursStr, endMinutesStr] = endTime.split(':')
  const hoursDiff = Number(endHoursStr) - Number(startHoursStr)
  const minutesDiff = Number(endMinutesStr) - Number(startMinutesStr)
  return hoursDiff + minutesDiff / 60
}

function CalendarEvent({ event }) {
  const widthPct = Math.floor(100 / (1 + event.nOverlaps))
  const durationHrs = getDurationHrs(event.startTime, event.endTime)
  const hrsFromMidnight = getHoursFromMidnight(event.startTime)

  return (
    <div
      key={event.id}
      className="calendar-event"
      style={{
        width: String(widthPct) + '%',
        height: String((durationHrs / 24) * 100) + '%',
        left: String((event.horzPosn - 1) * widthPct) + '%',
        top: String((hrsFromMidnight / 24) * 100) + '%',
      }}
    >
      {event.title}
    </div>
  )
}

function TimeBar({ hour }) {
  return (
    <div
      className="day-calendar-time-bar"
      style={{
        top: String(100 * (hour / 24)) + '%',
        // height: String(100 * (1 / 24)) + '%',
      }}
    >
      {' '}
      {String(hour).padStart(2, '0')}:00{' '}
    </div>
  )
}

function DayCalendar() {
  return (
    <div className="day-calendar">
      <div className="day-calendar-time-axis">
        {Array.from({ length: 24 }, (e, i) => i).map((hour) => (
          <TimeBar key={hour} hour={hour} />
        ))}
      </div>
      <div className="day-calendar-events">
        {arrangeEvents(eventData).map((evt) => (
          <CalendarEvent key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  )
}

function DayView({ startTime, selectedPeriod, onPeriodSelect }) {
  function selectThisDay() {
    console.log('select this day!')
  }

  const initialScrollPosn = getHoursFromMidnight(startTime) / 24
  const date = selectedPeriod.date.split('/').splice(0, 2).join('/')
  const day = getDayFromDateStr(selectedPeriod.date, 'long')
  const header = day + ', ' + date

  return (
    <div className="day-view">
      <div className="day-view-header">{header}</div>
      <DayCalendar />
    </div>
  )
}

function MonthView({ startDate, selectedPeriod, onPeriodSelect }) {
  return <div>Hello Month</div>
}

function WeekView({ startDate, selectedPeriod, onPeriodSelect }) {
  const dates = [0, 1, 2, 3, 4, 5, 6].map((day) => shiftDateStr(startDate, day))

  const selectThisWeek = () => {
    console.log('clicked on the week!')
    onPeriodSelect('week', startDate)
  }

  return (
    <>
      <div className="week-view-wrapper" onClick={selectThisWeek}>
        <div
          className={
            'week-view-header' +
            ' ' +
            (selectedPeriod.type == 'week' ? 'week-view-header-selected' : '')
          }
        >
          Your week at a glance.
        </div>
        <div className="week-view">
          {dates.map((dateStr) => (
            <Day
              dateStr={dateStr}
              selected={
                selectedPeriod.type == 'day' && selectedPeriod.date == dateStr
              }
              onClick={(isNotSelected: boolean) => {
                if (isNotSelected) {
                  onPeriodSelect('day', dateStr)
                } else {
                  onPeriodSelect('week', startDate)
                }
              }}
              key={dateStr}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default function PeriodView({
  periodContext,
  anchorPeriod,
  selectedPeriod,
  onPeriodSelect,
}) {
  const handlePeriodSelect = (
    type: string,
    date: string,
    time: string | null = null
  ) => {
    const periodData = { type, date, time }
    console.log(periodData)
    onPeriodSelect(periodData)
  }

  return (
    <>
      {periodContext == 'day' && (
        <DayView
          startTime={anchorPeriod.time}
          selectedPeriod={selectedPeriod}
          onPeriodSelect={handlePeriodSelect}
        />
      )}
      {periodContext == 'week' && (
        <WeekView
          startDate={anchorPeriod.date}
          selectedPeriod={selectedPeriod}
          onPeriodSelect={handlePeriodSelect}
        />
      )}
      {periodContext == 'month' && (
        <MonthView
          startDate={anchorPeriod.date}
          selectedPeriod={selectedPeriod}
          onPeriodSelect={handlePeriodSelect}
        />
      )}
    </>
  )
}
