import type { CalendarEvent } from '@prisma/client'

import {
  calendarEvents,
  calendarEvent,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from './calendarEvents'
import type { StandardScenario } from './calendarEvents.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('calendarEvents', () => {
  scenario('returns all calendarEvents', async (scenario: StandardScenario) => {
    const result = await calendarEvents()

    expect(result.length).toEqual(Object.keys(scenario.calendarEvent).length)
  })

  scenario(
    'returns a single calendarEvent',
    async (scenario: StandardScenario) => {
      const result = await calendarEvent({ id: scenario.calendarEvent.one.id })

      expect(result).toEqual(scenario.calendarEvent.one)
    }
  )

  scenario('creates a calendarEvent', async (scenario: StandardScenario) => {
    const result = await createCalendarEvent({
      input: {
        userId: scenario.calendarEvent.two.userId,
        description: 'String',
        type: 'String',
        startDate: 'String',
        endDate: 'String',
      },
    })

    expect(result.userId).toEqual(scenario.calendarEvent.two.userId)
    expect(result.description).toEqual('String')
    expect(result.type).toEqual('String')
    expect(result.startDate).toEqual('String')
    expect(result.endDate).toEqual('String')
  })

  scenario('updates a calendarEvent', async (scenario: StandardScenario) => {
    const original = (await calendarEvent({
      id: scenario.calendarEvent.one.id,
    })) as CalendarEvent
    const result = await updateCalendarEvent({
      id: original.id,
      input: { description: 'String2' },
    })

    expect(result.description).toEqual('String2')
  })

  scenario('deletes a calendarEvent', async (scenario: StandardScenario) => {
    const original = (await deleteCalendarEvent({
      id: scenario.calendarEvent.one.id,
    })) as CalendarEvent
    const result = await calendarEvent({ id: original.id })

    expect(result).toEqual(null)
  })
})
