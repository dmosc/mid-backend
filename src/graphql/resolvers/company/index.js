import companyQueries from './queries';
import companyMutations from './mutations';

const resolveCompany = {
  /**
   * The idea is to use loaders to dynamically
   * create relations in the future
   *
   * Remove the eslint bypass when that happens
   */

  // eslint-disable-next-line no-unused-vars
  one: (company, loaders) => ({
    ...company._doc,
    id: company._doc._id,
  }),
  many: (companies, loaders) => companies.map((company) => resolveCompany.one(company, loaders)),
};

export { companyQueries };
export { companyMutations };
export default resolveCompany;
