import type {
  QueryResolvers,
  MutationResolvers,
  CalendarEventRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const calendarEvents: QueryResolvers['calendarEvents'] = () => {
  return db.calendarEvent.findMany()
}

export const calendarEvent: QueryResolvers['calendarEvent'] = ({ id }) => {
  return db.calendarEvent.findUnique({
    where: { id },
  })
}

export const createCalendarEvent: MutationResolvers['createCalendarEvent'] = ({
  input,
}) => {
  return db.calendarEvent.create({
    data: input,
  })
}

export const updateCalendarEvent: MutationResolvers['updateCalendarEvent'] = ({
  id,
  input,
}) => {
  return db.calendarEvent.update({
    data: input,
    where: { id },
  })
}

export const deleteCalendarEvent: MutationResolvers['deleteCalendarEvent'] = ({
  id,
}) => {
  return db.calendarEvent.delete({
    where: { id },
  })
}

export const CalendarEvent: CalendarEventRelationResolvers = {
  user: (_obj, { root }) => {
    return db.calendarEvent.findUnique({ where: { id: root?.id } }).user()
  },
}
