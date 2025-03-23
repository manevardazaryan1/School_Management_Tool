//  * client
//  *
//  * This file configures and exports an Apollo Client instance for making GraphQL requests.
//  * It sets up an HTTP link to the GraphQL server and uses an in-memory cache.
//  *

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default client