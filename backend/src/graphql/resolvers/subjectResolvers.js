const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const subjectResolvers = {
  Query: {
    subjects: () => prisma.subject.findMany(),
    subject: (_, { id }) => prisma.subject.findUnique({ where: { id: parseInt(id) } }),
  },
  Mutation: {
    createSubject: (_, { name }) => {
      return prisma.subject.create({
        data: {
          name,
        },
      });
    },
    updateSubject: (_, { id, name }) => {
      return prisma.subject.update({
        where: { id: parseInt(id) },
        data: { name },
      });
    },
    deleteSubject: (_, { id }) => prisma.subject.delete({ where: { id: parseInt(id) } }),
  },
  Subject: {
    teachers: (parent) => prisma.subject.findUnique({where: {id: parent.id}}).teachers()
  }
};

module.exports = subjectResolvers;