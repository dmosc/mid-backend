import { ApolloServer } from 'apollo-server-express';
import { env } from '@config/environment';
import schema from '@graphql/schema';
import context from '@graphql/context';
import { paginate, inherits } from './directives';

const playgroundSettings = {
  settings: {
    'editor.theme': 'dark',
  },
};

const apolloServer = new ApolloServer({
  schema,
  playground: env.development ? playgroundSettings : false,
  context,
  schemaDirectives: {
    inherits,
    paginate,
  },
  subscriptions: {
    onConnect: ({ token }) => ({ token }),
  },
  cors: {
    origin: true,
    credentials: true,
  },
});

export default apolloServer;
