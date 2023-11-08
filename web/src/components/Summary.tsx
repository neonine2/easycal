import { getDayFromDateStr } from './dateUtils'

function SummaryTitle({ title = 'Summary' }) {
  return <h2 style={{ fontWeight: 'bolder' }}>{title}</h2>
}

export default function Summary({ periodContext, selectedPeriod }) {
  return (
    <>
      {selectedPeriod.type == 'week' && (
        <div className="summary">
          <SummaryTitle title="Weekly Summary" />
          <div>
            <ul>
              <li>Monday: 2 meetings</li>
              <li>Tuesday: drinks with the gang</li>
              <li>Thursday: move into new apartment</li>
            </ul>
          </div>
        </div>
      )}
      {selectedPeriod.type == 'day' && (
        <div className="summary">
          <SummaryTitle
            title={
              `${getDayFromDateStr(selectedPeriod.date)}` +
              `, ${selectedPeriod.date.split('/').slice(0, 2).join('/')}`
            }
          />
          <ul>
            <li>Morning: all clear! </li>
            <li>Afternoon: coffee chat with Andy</li>
            <li>Evening: video call with Christos</li>
          </ul>
        </div>
      )}
    </>
  )
}
