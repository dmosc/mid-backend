import { userQueries, userMutations } from './user';
import { companyMutations, companyQueries } from './company';
import { gcpQueries } from './gcp';

const resolvers = {
  Query: {
    ...userQueries,
    ...companyQueries,
    ...gcpQueries,
    serverDate: () => new Date().toISOString(),
  },
  Mutation: {
    ...userMutations,
    ...companyMutations,
  },
};

export default resolvers;
