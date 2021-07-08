import { Mediation } from '@db/models';
import resolveMediation from '@graphql/resolvers/mediation';

const mediationQueries = {
  mediations: async (_, { params = { page: 1, pageSize: 100 } }, { loaders }) => {
    const query = { deleted: false };
    const { page, pageSize } = params;

    const [results, count] = await Promise.all([
      Mediation
        .find(query)
        .populate('complaint mediator representatives requestedBy')
        .skip(pageSize * (page - 1))
        .limit(pageSize),
      Mediation.countDocuments(query),
    ]);

    return {
      results: resolveMediation.many(results, loaders),
      count,
      params,
    };
  },
  mediation: async (_, { id }, { loaders }) => {
    const mediation = await Mediation
      .findOne({ _id: id })
      .populate('complaint mediator representatives requestedBy')

    return resolveMediation.one(mediation, loaders);
  },
};

export default mediationQueries;
