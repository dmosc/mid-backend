import { userQueries, userMutations } from './user';
import { companyMutations, companyQueries } from './company';
import { gcpQueries } from './gcp';
import { docusignQueries } from './docusign';

const resolvers = {
  Query: {
    ...userQueries,
    ...companyQueries,
    ...gcpQueries,
    ...docusignQueries,
    serverDate: () => new Date().toISOString(),
  },
  Mutation: {
    ...userMutations,
    ...companyMutations,
  },
};

export default resolvers;
