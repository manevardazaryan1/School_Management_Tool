//  * resolvers
//  *
//  * This file aggregates all GraphQL resolvers from different modules (user, teacher, pupil, subject, admin)
//  * into a single resolvers object. It also includes the JSON scalar type for handling JSON data.
//  *

const userResolvers = require("./userResolvers")
const teacherResolvers = require("./teacherResolvers")
const pupilResolvers = require("./pupilResolvers")
const subjectResolvers = require("./subjectResolvers")
const adminResolvers = require("./adminResolvers")

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
  JSON: require('graphql-type-json').GraphQLJSONObject,
}

module.exports = resolvers