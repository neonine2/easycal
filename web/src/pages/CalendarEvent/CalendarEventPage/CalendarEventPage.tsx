import CalendarEventCell from 'src/components/CalendarEvent/CalendarEventCell'

type CalendarEventPageProps = {
  id: number
}

const CalendarEventPage = ({ id }: CalendarEventPageProps) => {
  return <CalendarEventCell id={id} />
}

export default CalendarEventPage
