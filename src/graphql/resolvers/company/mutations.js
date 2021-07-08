import { Company } from '@db/models';
import resolveCompany from '@graphql/resolvers/company';

const companyMutations = {
  createCompany: async (_, { company }, { loaders }) => {
    const newCompany = new Company({
      ...company
    });

    const savedCompany = await newCompany.save();

    return resolveCompany.one(savedCompany, loaders);
  },
  updateCompany: async (_, { id, company }, { loaders }) => {
    const updatedCompany = await Company.findOneAndUpdate(
      { _id: id },
      { $set: { ...company } },
      { new: true }
    );

    return resolveCompany.one(updatedCompany, loaders);
  },
};

export default companyMutations;
