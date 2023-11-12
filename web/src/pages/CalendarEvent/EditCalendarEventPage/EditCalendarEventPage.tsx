import EditCalendarEventCell from 'src/components/CalendarEvent/EditCalendarEventCell'

type CalendarEventPageProps = {
  id: number
}

const EditCalendarEventPage = ({ id }: CalendarEventPageProps) => {
  return <EditCalendarEventCell id={id} />
}

export default EditCalendarEventPage
