import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String3298281',
        name: 'String',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        email: 'String3816410',
        name: 'String',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
