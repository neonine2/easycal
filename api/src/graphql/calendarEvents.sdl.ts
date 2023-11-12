export const schema = gql`
  type CalendarEvent {
    id: Int!
    user: User!
    userId: Int!
    description: String!
    notes: String
    type: String!
    startDate: String!
    endDate: String!
    startTime: String
    endTime: String
  }

  type Query {
    calendarEvents: [CalendarEvent!]! @requireAuth
    calendarEvent(id: Int!): CalendarEvent @requireAuth
  }

  input CreateCalendarEventInput {
    userId: Int!
    description: String!
    notes: String
    type: String!
    startDate: String!
    endDate: String!
    startTime: String
    endTime: String
  }

  input UpdateCalendarEventInput {
    userId: Int
    description: String
    notes: String
    type: String
    startDate: String
    endDate: String
    startTime: String
    endTime: String
  }

  type Mutation {
    createCalendarEvent(input: CreateCalendarEventInput!): CalendarEvent!
      @requireAuth
    updateCalendarEvent(
      id: Int!
      input: UpdateCalendarEventInput!
    ): CalendarEvent! @requireAuth
    deleteCalendarEvent(id: Int!): CalendarEvent! @requireAuth
  }
`
