import { User } from '@db/models';
import { hashSync } from 'bcryptjs';
import resolveUser from '@graphql/resolvers/user';

const userMutations = {
  createUser: async (_, { user }, { loaders }) => {
    const newUser = new User({
      ...user,
      password: hashSync(user.password),
    });

    const savedUser = await newUser.save();

    return resolveUser.one(savedUser, loaders);
  },
  updateUser: async (_, { id, user }, { loaders }) => {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { ...user } },
      { new: true }
    );

    return resolveUser.one(updatedUser, loaders);
  },
};

export default userMutations;
