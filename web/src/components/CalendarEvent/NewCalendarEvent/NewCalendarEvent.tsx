import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CalendarEventForm from 'src/components/CalendarEvent/CalendarEventForm'

import type { CreateCalendarEventInput } from 'types/graphql'

const CREATE_CALENDAR_EVENT_MUTATION = gql`
  mutation CreateCalendarEventMutation($input: CreateCalendarEventInput!) {
    createCalendarEvent(input: $input) {
      id
    }
  }
`

const NewCalendarEvent = () => {
  const [createCalendarEvent, { loading, error }] = useMutation(
    CREATE_CALENDAR_EVENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CalendarEvent created')
        navigate(routes.calendarEvents())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCalendarEventInput) => {
    createCalendarEvent({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CalendarEvent</h2>
      </header>
      <div className="rw-segment-main">
        <CalendarEventForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCalendarEvent
