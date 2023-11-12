import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CalendarEvent/CalendarEventsCell'
import { truncate } from 'src/lib/formatters'

import type {
  DeleteCalendarEventMutationVariables,
  FindCalendarEvents,
} from 'types/graphql'

const DELETE_CALENDAR_EVENT_MUTATION = gql`
  mutation DeleteCalendarEventMutation($id: Int!) {
    deleteCalendarEvent(id: $id) {
      id
    }
  }
`

const CalendarEventsList = ({ calendarEvents }: FindCalendarEvents) => {
  const [deleteCalendarEvent] = useMutation(DELETE_CALENDAR_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('CalendarEvent deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteCalendarEventMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete calendarEvent ' + id + '?')) {
      deleteCalendarEvent({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Description</th>
            <th>Notes</th>
            <th>Type</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Start time</th>
            <th>End time</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {calendarEvents.map((calendarEvent) => (
            <tr key={calendarEvent.id}>
              <td>{truncate(calendarEvent.id)}</td>
              <td>{truncate(calendarEvent.userId)}</td>
              <td>{truncate(calendarEvent.description)}</td>
              <td>{truncate(calendarEvent.notes)}</td>
              <td>{truncate(calendarEvent.type)}</td>
              <td>{truncate(calendarEvent.startDate)}</td>
              <td>{truncate(calendarEvent.endDate)}</td>
              <td>{truncate(calendarEvent.startTime)}</td>
              <td>{truncate(calendarEvent.endTime)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.calendarEvent({ id: calendarEvent.id })}
                    title={'Show calendarEvent ' + calendarEvent.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCalendarEvent({ id: calendarEvent.id })}
                    title={'Edit calendarEvent ' + calendarEvent.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete calendarEvent ' + calendarEvent.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(calendarEvent.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CalendarEventsList
