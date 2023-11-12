import type {
  EditCalendarEventById,
  UpdateCalendarEventInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CalendarEventForm from 'src/components/CalendarEvent/CalendarEventForm'

export const QUERY = gql`
  query EditCalendarEventById($id: Int!) {
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
const UPDATE_CALENDAR_EVENT_MUTATION = gql`
  mutation UpdateCalendarEventMutation(
    $id: Int!
    $input: UpdateCalendarEventInput!
  ) {
    updateCalendarEvent(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  calendarEvent,
}: CellSuccessProps<EditCalendarEventById>) => {
  const [updateCalendarEvent, { loading, error }] = useMutation(
    UPDATE_CALENDAR_EVENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CalendarEvent updated')
        navigate(routes.calendarEvents())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCalendarEventInput,
    id: EditCalendarEventById['calendarEvent']['id']
  ) => {
    updateCalendarEvent({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CalendarEvent {calendarEvent?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CalendarEventForm
          calendarEvent={calendarEvent}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
