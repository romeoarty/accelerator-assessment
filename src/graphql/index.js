const { ApolloServer, gql } = require("apollo-server-express");
const { getAll } = require("../services/calendar");

const typeDefs = gql`
  type Event {
    title: String
    location: String
    startDateTime: String
    endDateTime: String
  }

  type Query {
    eventsByUserEmail(email: String!, page: Int, pageSize: Int): [Event]
  }
`;

const resolvers = {
  Query: {
    eventsByUserEmail: async (_, { email, page, pageSize }) => {
      const events = await getAll(email, page, pageSize);
      return events.data.records;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = {
  server,
};
