import type { FindCalendarEventById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CalendarEvent from 'src/components/CalendarEvent/CalendarEvent'

export const QUERY = gql`
  query FindCalendarEventById($id: Int!) {
    calendarEvent: calendarEvent(id: $id) {
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

export const Empty = () => <div>CalendarEvent not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  calendarEvent,
}: CellSuccessProps<FindCalendarEventById>) => {
  return <CalendarEvent calendarEvent={calendarEvent} />
}
