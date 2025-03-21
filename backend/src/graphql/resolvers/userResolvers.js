const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userResolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_, { id }) => prisma.user.findUnique({ where: { id: parseInt(id) } }),
  },
  Mutation: {
    createUser: (_, { email, password, role, firstName, lastName, grades, preferences, assignedSubject, subjectIds }) => {
      return prisma.user.create({
        data: {
          email,
          password,
          role,
          teacher: role === 'TEACHER' ? { create: { firstName, lastName, subjects: { connect: subjectIds.map(id => ({ id: parseInt(id) })) } } } : undefined,
          pupil: role === 'PUPIL' ? { create: { firstName, lastName, grades, preferences, assignedSubject } } : undefined,
          admin: role === 'ADMIN' ? { create: { firstName, lastName } } : undefined,
        },
        include: { teacher: true, pupil: true, admin: true},
      });
    },
    updateUser: (_, { id, email, password, role }) => {
      return prisma.user.update({
        where: { id: parseInt(id) },
        data: { email, password, role },
      });
    },
    deleteUser: (_, { id }) => prisma.user.delete({ where: { id: parseInt(id) } }),
  },
  User: {
    teacher: (parent) => prisma.teacher.findUnique({ where: { userId: parent.id } }),
    pupil: (parent) => prisma.pupil.findUnique({ where: { userId: parent.id } }),
    admin: (parent) => prisma.admin.findUnique({ where: { userId: parent.id } }),
  },
};

module.exports = userResolvers;