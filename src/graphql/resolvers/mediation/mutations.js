import { Mediation } from '@db/models';
import resolveMediation from '@graphql/resolvers/mediation';

const mediationMutations = {
  createMediation: async (_, { mediation }, { user, loaders }) => {
    const newMediation = new Mediation({
      ...mediation,
      requestedBy: user.id
    });

    const savedMediation = await newMediation.save();

    return resolveMediation.one(savedMediation, loaders);
  },
  updateMediation: async (_, { id, mediation }, { loaders }) => {
    const updatedMediation = await Mediation.findOneAndUpdate(
      { _id: id },
      { $set: { ...mediation } },
      { new: true }
    );

    return resolveMediation.one(updatedMediation, loaders);
  },
};

export default mediationMutations;
