import mediationQueries from './queries';
import mediationMutations from './mutations';

const resolveMediation = {
  /**
   * The idea is to use loaders to dynamically
   * create relations in the future
   *
   * Remove the eslint bypass when that happens
   */

  // eslint-disable-next-line no-unused-vars
  one: (mediation, loaders) => ({
    ...mediation._doc,
    id: mediation._doc._id,
  }),
  many: (mediations, loaders) => mediations.map((mediation) => resolveMediation.one(mediation, loaders)),
};

export { mediationQueries };
export { mediationMutations };
export default resolveMediation;
