const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const teacherResolvers = {
  Query: {
    teachers: () => prisma.teacher.findMany(),
    teacher: (_, { id }) => prisma.teacher.findUnique({ where: { id: parseInt(id) } }),
  },
  Mutation: {
    createTeacher: (_, { firstName, lastName, userId, subjectIds }) => {
      return prisma.teacher.create({
        data: {
          firstName,
          lastName,
          user: { connect: { id: parseInt(userId) } },
          subjects: { connect: subjectIds.map(id => ({ id: parseInt(id) })) },
        },
      });
    },
    updateTeacher: (_, { id, firstName, lastName, subjectIds }) => {
      return prisma.teacher.update({
        where: { id: parseInt(id) },
        data: { firstName, lastName, subjects: { set: subjectIds.map(id => ({ id: parseInt(id) })) } },
      });
    },
    deleteTeacher: (_, { id }) => prisma.teacher.delete({ where: { id: parseInt(id) } }),
  },
  Teacher: {
    subjects: (parent) => prisma.teacher.findUnique({ where: { id: parent.id } }).subjects(),
    user: (parent) => prisma.user.findUnique({where: {id: parent.userId}})
  },
};

module.exports = teacherResolvers;