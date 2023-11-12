import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

import type {
  DeleteCalendarEventMutationVariables,
  FindCalendarEventById,
} from 'types/graphql'

const DELETE_CALENDAR_EVENT_MUTATION = gql`
  mutation DeleteCalendarEventMutation($id: Int!) {
    deleteCalendarEvent(id: $id) {
      id
    }
  }
`

interface Props {
  calendarEvent: NonNullable<FindCalendarEventById['calendarEvent']>
}

const CalendarEvent = ({ calendarEvent }: Props) => {
  const [deleteCalendarEvent] = useMutation(DELETE_CALENDAR_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('CalendarEvent deleted')
      navigate(routes.calendarEvents())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCalendarEventMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete calendarEvent ' + id + '?')) {
      deleteCalendarEvent({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            CalendarEvent {calendarEvent.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{calendarEvent.id}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{calendarEvent.userId}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{calendarEvent.description}</td>
            </tr>
            <tr>
              <th>Notes</th>
              <td>{calendarEvent.notes}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{calendarEvent.type}</td>
            </tr>
            <tr>
              <th>Start date</th>
              <td>{calendarEvent.startDate}</td>
            </tr>
            <tr>
              <th>End date</th>
              <td>{calendarEvent.endDate}</td>
            </tr>
            <tr>
              <th>Start time</th>
              <td>{calendarEvent.startTime}</td>
            </tr>
            <tr>
              <th>End time</th>
              <td>{calendarEvent.endTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCalendarEvent({ id: calendarEvent.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(calendarEvent.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default CalendarEvent
