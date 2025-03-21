const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const adminResolvers = {
  Query: {
    admins: () => prisma.admin.findMany(),
    admin: (_, { id }) => prisma.admin.findUnique({ where: { id: parseInt(id) } }),
  },
  Mutation: {
    createAdmin: (_, { firstName, lastName, userId }) => {
      return prisma.admin.create({
        data: {
          firstName,
          lastName,
          user: { connect: { id: parseInt(userId) } },
        },
      });
    },
    updateAdmin: (_, { id, firstName, lastName }) => {
      return prisma.admin.update({
        where: { id: parseInt(id) },
        data: { firstName, lastName },
      });
    },
    deleteAdmin: (_, { id }) => prisma.admin.delete({ where: { id: parseInt(id) } }),
  },
  Admin: {
    user: (parent) => prisma.user.findUnique({where: {id: parent.userId}})
  }
};

module.exports = adminResolvers;