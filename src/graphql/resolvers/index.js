import { userQueries, userMutations } from './user';
import { gcpQueries } from './gcp';

const resolvers = {
  Query: {
    ...userQueries,
    ...gcpQueries,
    serverDate: () => new Date().toISOString(),
  },
  Mutation: {
    ...userMutations,
  },
};

export default resolvers;
