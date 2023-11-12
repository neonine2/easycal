import { useState } from 'react'

import {
  CreateCalendarEventMutation,
  CreateCalendarEventMutationVariables,
} from 'types/graphql'

import { SubmitHandler } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Head } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import AddEventForm from 'src/components/AddEventForm'
import {
  getDayFromDateStr,
  getTimeNowStr,
  getTodayDateStr,
} from 'src/components/dateUtils'
import NavToolbar from 'src/components/NavToolbar'
import PeriodView from 'src/components/PeriodView'
import Summary from 'src/components/Summary'

export function EasyCal() {
  return <span className="easycal-logo">EasyCal</span>
}

export interface Period {
  type: string
  date: string
  time: string | null
  title: string | null
  id: number | null
}

interface AddEventData {
  description: string
  notes: string | null
  type: string
}

const CREATE_EVENT = gql`
  mutation CreateCalendarEventMutation($input: CreateCalendarEventInput!) {
    createCalendarEvent(input: $input) {
      id
    }
  }
`

const getEventType = (periodContext, selectedPeriod) => {
  if (periodContext == 'day') {
    return 'intraday'
  } else if (periodContext == 'week') {
    return selectedPeriod.type == 'week' ? 'all-week' : 'all-day'
  } else if (periodContext == 'month') {
    return selectedPeriod.type == 'month' ? 'all-month' : 'all-day'
  }
}

export default function MainPage() {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [createEvent] = useMutation<
    CreateCalendarEventMutation,
    CreateCalendarEventMutationVariables
  >(CREATE_EVENT)
  const [addingEvent, toggleAddingEvent] = useState(false)
  const [selectedPage, setSelectedPage] = useState('calendar')
  const [periodContext, setPeriodContext] = useState('week')
  const [anchorPeriod, setAnchorPeriod] = useState({
    date: getTodayDateStr(),
    time: getTimeNowStr(),
    id: null,
  })
  const [selectedPeriod, selectPeriod] = useState({
    type: 'week',
    ...anchorPeriod,
  })

  const [eventType, setEventType] = useState('all-week')

  const handlePeriodSelection = (new_period) => {
    selectPeriod(new_period)
    setEventType(getEventType(periodContext, new_period))
  }

  const handlePeriodContextChange = (new_context: string) => {
    if (periodContext == 'day') {
      selectPeriod({ ...selectedPeriod, type: 'day' })
    } else if (selectedPeriod.type == 'day') {
      selectPeriod({ ...selectedPeriod, type: 'day' })
    } else {
      selectPeriod({ ...selectedPeriod, type: new_context })
    }
    setPeriodContext(new_context)
    setEventType(getEventType(new_context, selectedPeriod))
  }

  const handleSelectedPageChange = (new_page: string) => {
    if (new_page != 'add') {
      setSelectedPage(new_page)
    } else {
      if (selectedPeriod.type == 'event') {
        selectPeriod({ ...selectedPeriod, type: 'day' })
      }
      toggleAddingEvent(true)
    }
  }

  const getAddEventFormHeading = () => {
    if (periodContext == 'day') {
      return 'Add Event for the Day'
    } else if (periodContext == 'week') {
      return selectedPeriod.type == 'week'
        ? 'Add Event for the Week'
        : 'Add Event for ' + getDayFromDateStr(selectedPeriod.date)
    } else if (periodContext == 'month') {
      return selectedPeriod.type == 'month'
        ? 'Add Event for the Month'
        : 'Add Event for ' +
            selectedPeriod.date.split('/').slice(0, 2).join('/')
    }
  }

  const onAddEventSubmit: SubmitHandler<AddEventData> = (formData) => {
    const startDate = selectedPeriod.date
    const endDate = selectedPeriod.date
    const userId = 1
    createEvent({
      variables: {
        input: { ...formData, startDate, endDate, userId },
      },
    })
  }

  const onAddEventCancel = () => {
    toggleAddingEvent(false)
  }

  return (
    <div className="main-page">
      <Head>
        <title>Calendar</title>
      </Head>
      <div className="header">
        <div style={{ flex: '1 1 0', textAlign: 'left', fontSize: '0.75em' }}>
          {isAuthenticated && `Hi, ${currentUser.name}.`}
        </div>
        <div
          style={{
            flex: '1 1 0',
            textAlign: 'center',
            fontWeight: 'bolder',
            fontSize: '1em',
            color: '#333',
          }}
        >
          EasyCal.ai
        </div>
        <div
          style={{ flex: '1 1 0', textAlign: 'right', fontSize: '0.75em' }}
        ></div>
      </div>
      <NavToolbar
        leftOptions={['calendar', 'add']}
        rightOptions={['dummy', 'settings']}
        periodContext={periodContext}
        selectedPage={selectedPage}
        onPeriodContextChange={handlePeriodContextChange}
        onSelectedPageChange={handleSelectedPageChange}
      />

      {selectedPage == 'calendar' && (
        <div className={periodContext == 'day' ? 'vert-layout' : 'vert-layout'}>
          <PeriodView
            periodContext={periodContext}
            anchorPeriod={anchorPeriod}
            selectedPeriod={selectedPeriod}
            onPeriodSelect={handlePeriodSelection}
          />
          {!addingEvent && (
            <Summary
              periodContext={periodContext}
              selectedPeriod={selectedPeriod}
            />
          )}
          {addingEvent && (
            <AddEventForm
              onSubmit={onAddEventSubmit}
              onCancel={onAddEventCancel}
              heading={getAddEventFormHeading()}
              eventType={eventType}
              setEventType={setEventType}
            />
          )}
        </div>
      )}

      <div className="footer">
        <button
          className="logout-button icon icon-logout-left"
          onClick={logOut}
        ></button>
      </div>
    </div>
  )
}
