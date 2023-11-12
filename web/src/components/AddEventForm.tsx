import { Form, Submit, TextField, SelectField, Label } from '@redwoodjs/forms'

export default function AddEventForm({
  eventType,
  setEventType,
  heading,
  onSubmit,
  onCancel,
  disableSubmit,
}) {
  const submitButtonStyling = {
    fontSize: '1.15em',
    border: 'none',
    borderRadius: '0px',
    height: '35px',
    width: '100%',
  }

  return (
    <Form className="add-event-form" onSubmit={onSubmit}>
      <div className="add-event-header">{heading}</div>
      <div className="add-event-form-option">
        <Label name="description">What event would you like to create? </Label>
        <TextField
          className="add-event-description"
          name="description"
          style={{ border: '1px solid #666', outline: 'none' }}
          validation={{ required: true }}
        />

        <div className="add-event-choose-type">
          <Label name="type" style={{ fontSize: '1em' }}>
            Type:{' '}
          </Label>
          <SelectField
            value={eventType}
            name="type"
            style={{ fontSize: '1em' }}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="intraday">Intra-Day</option>
            <option value="all-day">All-Day</option>
            <option value="all-week">All-Week</option>
            <option value="all-month">All-Month</option>
          </SelectField>
        </div>
      </div>

      {/* <div className="add-event-form-option">
        <Label name="notes">Any notes?</Label>
        <TextAreaField className="add-event-notes" name="notes" />
      </div> */}
      <div className="add-event-form-buttons">
        <Submit
          disabled={disableSubmit}
          className="add-event-submit"
          style={submitButtonStyling}
        >
          ✔️
        </Submit>
        <button
          className="add-event-submit"
          style={submitButtonStyling}
          onClick={onCancel}
        >
          ✖️
        </button>
      </div>
    </Form>
  )
}
