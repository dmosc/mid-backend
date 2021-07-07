import { User } from '@db/models';
import resolveUser from '@graphql/resolvers/user';

const usersQueries = {
  users: async (_, { params = { page: 1, pageSize: 100 } }, { loaders }) => {
    const query = { deleted: false };
    const { page, pageSize } = params;

    const [results, count] = await Promise.all([
      User
        .find(query)
        .populate('representative.company')
        .skip(pageSize * (page - 1))
        .limit(pageSize),
      User.countDocuments(query),
    ]);

    return {
      results: resolveUser.many(results, loaders),
      count,
      params,
    };
  },
  user: async (_, { id }, { loaders }) => {
    const user = await User
      .findOne({ _id: id })
      .populate('representative.company');

    return resolveUser.one(user, loaders);
  },
};

export default usersQueries;
