import type { Prisma, CalendarEvent } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CalendarEventCreateArgs>({
  calendarEvent: {
    one: {
      data: {
        description: 'String',
        type: 'String',
        startDate: 'String',
        endDate: 'String',
        user: {
          create: {
            email: 'String6768630',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        description: 'String',
        type: 'String',
        startDate: 'String',
        endDate: 'String',
        user: {
          create: {
            email: 'String2091617',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CalendarEvent, 'calendarEvent'>
