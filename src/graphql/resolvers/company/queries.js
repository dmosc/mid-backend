import { Company } from '@db/models';
import resolveCompany from '@graphql/resolvers/company';

const companyQueries = {
  companies: async (_, { params = { page: 1, pageSize: 100 } }, { loaders }) => {
    const query = { deleted: false };
    const { page, pageSize } = params;

    const [results, count] = await Promise.all([
      Company
        .find(query)
        .skip(pageSize * (page - 1))
        .limit(pageSize),
      Company.countDocuments(query),
    ]);

    return {
      results: resolveCompany.many(results, loaders),
      count,
      params,
    };
  },
  company: async (_, { id }, { loaders }) => {
    const company = await Company
      .findOne({ _id: id })

    return resolveCompany.one(company, loaders);
  },
};

export default companyQueries;
