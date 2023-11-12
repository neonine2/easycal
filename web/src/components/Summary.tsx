import { getDayFromDateStr } from './dateUtils'

function SummaryTitle({ periodContext, selectedPeriod }) {
  let title = null
  switch (periodContext) {
    case 'day':
      if (selectedPeriod.type == 'day') {
        title =
          getDayFromDateStr(selectedPeriod.date) +
          ', ' +
          selectedPeriod.date.split('/').slice(0, 2).join('/')
      } else if (selectedPeriod.type == 'event') {
        title = 'Event: ' + selectedPeriod.title
      }
      break
    case 'week':
      if (selectedPeriod.type == 'week') {
        title = 'Week Summary'
      } else if (selectedPeriod.type == 'day') {
        title =
          getDayFromDateStr(selectedPeriod.date) +
          ', ' +
          selectedPeriod.date.split('/').slice(0, 2).join('/')
      }
      break
    case 'month':
      if (selectedPeriod.type == 'month') {
        title = 'Month Summary'
      } else if (selectedPeriod.type == 'day') {
        title =
          getDayFromDateStr(selectedPeriod.date) +
          ', ' +
          selectedPeriod.date.split('/').slice(0, 2).join('/')
      }
  }
  return <div className="summary-header">{title}</div>
}

function PeriodSummary({ periodContext, selectedPeriod }) {
  return <div>Hello, Summary!</div>
}

export default function Summary({ periodContext, selectedPeriod }) {
  return (
    <div className="summary">
      <SummaryTitle
        periodContext={periodContext}
        selectedPeriod={selectedPeriod}
      />
      <PeriodSummary
        periodContext={periodContext}
        selectedPeriod={selectedPeriod}
      />
    </div>
  )

  //   <>
  //     {selectedPeriod.type == 'week' && (
  //       <div className="summary">
  //         <SummaryTitle title="Weekly Summary" />
  //         <div>
  //           <ul>
  //             <li>Monday: 2 meetings</li>
  //             <li>Tuesday: drinks with the gang</li>
  //             <li>Thursday: move into new apartment</li>
  //           </ul>
  //         </div>
  //       </div>
  //     )}
  //     {selectedPeriod.type == 'day' && (
  //       <div className="summary">
  //         <SummaryTitle
  //           title={
  //             `${getDayFromDateStr(selectedPeriod.date)}` +
  //             `, ${selectedPeriod.date.split('/').slice(0, 2).join('/')}`
  //           }
  //         />
  //         <ul>
  //           <li>Morning: all clear! </li>
  //           <li>Afternoon: coffee chat with Andy</li>
  //           <li>Evening: video call with Christos</li>
  //         </ul>
  //       </div>
  //     )}
  //   </>
  // )
}
