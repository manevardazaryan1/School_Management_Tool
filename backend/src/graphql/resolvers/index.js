const userResolvers = require('./userResolvers');
const teacherResolvers = require('./teacherResolvers');
const pupilResolvers = require('./pupilResolvers');
const subjectResolvers = require('./subjectResolvers');
const adminResolvers = require('./adminResolvers');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...teacherResolvers.Query,
    ...pupilResolvers.Query,
    ...subjectResolvers.Query,
    ...adminResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...teacherResolvers.Mutation,
    ...pupilResolvers.Mutation,
    ...subjectResolvers.Mutation,
    ...adminResolvers.Mutation,
  },
  User: userResolvers.User,
  Teacher: teacherResolvers.Teacher,
  Pupil: pupilResolvers.Pupil,
  Subject: subjectResolvers.Subject,
  Admin: adminResolvers.Admin,
  JSON: require('graphql-type-json').GraphQLJSONObject, // Add JSON scalar
};

module.exports = resolvers;