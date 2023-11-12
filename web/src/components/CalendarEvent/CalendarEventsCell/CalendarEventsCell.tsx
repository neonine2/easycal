import type { FindCalendarEvents } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CalendarEvents from 'src/components/CalendarEvent/CalendarEvents'

export const QUERY = gql`
  query FindCalendarEvents {
    calendarEvents {
      id
      userId
      description
      notes
      type
      startDate
      endDate
      startTime
      endTime
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No calendarEvents yet. '}
      <Link to={routes.newCalendarEvent()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  calendarEvents,
}: CellSuccessProps<FindCalendarEvents>) => {
  return <CalendarEvents calendarEvents={calendarEvents} />
}
