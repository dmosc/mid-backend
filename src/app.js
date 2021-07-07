import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import { graphqlUploadExpress } from 'graphql-upload';
import cors from 'cors';
import apolloServer from './graphql';
import { auth } from './routes';

const app = express();

const corsConfig = {
  credentials: true,
  origin: true,
};

// Middlewares
app.use(express.json(), cors(corsConfig), cookieParser(), graphqlUploadExpress());

apolloServer.applyMiddleware({
  app,
  cors: corsConfig,
});

// Routes
app.use('/auth', auth);

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer); // Enable subscriptions

export default httpServer;
