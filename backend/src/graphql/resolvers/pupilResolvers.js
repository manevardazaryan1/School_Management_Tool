//  * pupilResolvers
//  *
//  * This file defines the GraphQL resolvers for the Pupil model, handling queries and mutations.
//  * It uses Prisma Client to interact with the database.
//  *

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const pupilResolvers = {
  Query: {
    pupils: () => prisma.pupil.findMany(),
    pupil: (_, { id }) => prisma.pupil.findUnique({ where: { id: parseInt(id) } }),
  },
  Mutation: {
    createPupil: (_, { firstName, lastName, grades, preferences, assignedSubject, userId }) => {
      return prisma.pupil.create({
        data: {
          firstName,
          lastName,
          grades,
          preferences,
          assignedSubject,
          user: { connect: { id: parseInt(userId) } },
        },
      })
    },
    updatePupil: (_, { id, firstName, lastName, grades, preferences, assignedSubject }) => {
      return prisma.pupil.update({
        where: { id: parseInt(id) },
        data: { firstName, lastName, grades, preferences, assignedSubject },
      })
    },
    deletePupil: (_, { id }) => prisma.pupil.delete({ where: { id: parseInt(id) } }),
  },
  Pupil: {
    user: (parent) => prisma.user.findUnique({where: {id: parent.userId}})
  },
}

module.exports = pupilResolvers