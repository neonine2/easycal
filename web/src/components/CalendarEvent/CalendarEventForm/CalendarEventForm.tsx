import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditCalendarEventById,
  UpdateCalendarEventInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormCalendarEvent = NonNullable<EditCalendarEventById['calendarEvent']>

interface CalendarEventFormProps {
  calendarEvent?: EditCalendarEventById['calendarEvent']
  onSave: (data: UpdateCalendarEventInput, id?: FormCalendarEvent['id']) => void
  error: RWGqlError
  loading: boolean
}

const CalendarEventForm = (props: CalendarEventFormProps) => {
  const onSubmit = (data: FormCalendarEvent) => {
    props.onSave(data, props?.calendarEvent?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormCalendarEvent> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.calendarEvent?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.calendarEvent?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="notes"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Notes
        </Label>

        <TextField
          name="notes"
          defaultValue={props.calendarEvent?.notes}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="notes" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <TextField
          name="type"
          defaultValue={props.calendarEvent?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="startDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start date
        </Label>

        <TextField
          name="startDate"
          defaultValue={props.calendarEvent?.startDate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="startDate" className="rw-field-error" />

        <Label
          name="endDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End date
        </Label>

        <TextField
          name="endDate"
          defaultValue={props.calendarEvent?.endDate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="endDate" className="rw-field-error" />

        <Label
          name="startTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start time
        </Label>

        <TextField
          name="startTime"
          defaultValue={props.calendarEvent?.startTime}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="startTime" className="rw-field-error" />

        <Label
          name="endTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End time
        </Label>

        <TextField
          name="endTime"
          defaultValue={props.calendarEvent?.endTime}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="endTime" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CalendarEventForm
