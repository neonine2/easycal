import { useState } from 'react'

import { Head } from '@redwoodjs/web'

import { getTimeNowStr, getTodayDateStr } from 'src/components/dateUtils'
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
}

export default function MainPage() {
  const [selectedPage, setSelectedPage] = useState('calendar')
  const [periodContext, setPeriodContext] = useState('week')
  const [anchorPeriod, setAnchorPeriod] = useState({
    date: getTodayDateStr(),
    time: getTimeNowStr(),
  })
  const [selectedPeriod, selectPeriod] = useState({
    type: 'week',
    ...anchorPeriod,
  })

  const handlePeriodContextChange = (new_context: string) =>
    setPeriodContext(new_context)
  const handleSelectedPageChange = (new_page: string) =>
    setSelectedPage(new_page)

  return (
    <div className="main-page">
      <Head>
        <title>Calendar</title>
      </Head>
      <div className="header">
        <div style={{ flex: '1 1 0', textAlign: 'left', fontSize: '0.75em' }}>
          Hi, Michael.
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
            onPeriodSelect={selectPeriod}
          />
          <Summary
            periodContext={periodContext}
            selectedPeriod={selectedPeriod}
          />
        </div>
      )}

      <div className="footer">
        <button className="icon icon-logout-left"></button>
      </div>
    </div>
  )
}
