import DataLoader from 'dataloader';
import { AuthenticationError, PubSub } from 'apollo-server-express';
import { verify } from 'jsonwebtoken';
import { User } from '@db/models';
import { secret } from '@config/environment';

const pubsub = new PubSub(); // Only works in dev environment.

const createLoader = (Model) => {
  const loader = new DataLoader(async (ids) => {
    const data = await Model.find({ _id: { $in: ids } });

    /*
      DataLoaders depend on the order of the input to return the result.
      So, it is needed to map results in order to create a correct output.
    */
    const dataMap = data.reduce((acc, curr) => {
      acc[curr._id] = curr;
      return acc;
    }, {});

    return ids.map((id) => dataMap[id]);
  });

  return {
    one: (id) => loader.load(id.toString()),
    many: async (ids) => loader.loadMany(ids.map((id) => id.toString())),
  };
};

const context = async ({ req = {} }) => {
  let token;

  const { authorization } = req.headers;

  if (authorization) [, token] = authorization.split('Bearer ');
  if (!token) throw new AuthenticationError('GraphQL API is only accesible with an access token');

  const { id } = verify(token, secret);

  const loaders = {
    user: createLoader(User),
  };

  return { user: { id }, loaders, pubsub };
};

export default context;
