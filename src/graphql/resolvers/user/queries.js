import { User } from '@db/models';
import resolveUser from '@graphql/resolvers/user';
import { buildQuery } from '@utils/builders';

const userQueries = {
  users: async (_, { mediator, representative, params = { page: 1, pageSize: 100 } }, { loaders }) => {
    const query = {
      deleted: false,
      ...buildQuery(mediator, 'mediator'),
      ...buildQuery(representative, 'representative')
    };

    const { page, pageSize } = params;

    const [results, count] = await Promise.all([
      User
        .find(query)
        .populate({ path: 'representative.company', model: 'Company' })
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
      .populate({ path: 'representative.company', model: 'Company' });

    return resolveUser.one(user, loaders);
  },
};

export default userQueries;
