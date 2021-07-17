import dotenv from 'dotenv';

dotenv.config();

const port = process.env.API_PORT;
const secret = process.env.JWT_SECRET;

const env = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  production: process.env.NODE_ENV === 'production',
};

const gcpConfig = {
  bucketName: process.env.BUCKET_NAME,
  credentialsUri: process.env.CREDENTIALS_URI,
  projectId: process.env.PROJECT_ID,
};

const mongo = {
  url: process.env.MONGO_URI,
};

const docusignConfig = {
  basePath: env.production ? "account.docusign.com" : "account-d.docusign.com",
  integrationKey: process.env.DOCUSIGN_INTEGRATION_KEY,
  userId: process.env.DOCUSIGN_USER_ID,
  redirectUri: process.env.DOCUSIGN_REDIRECT_URI,
  privateKeyUri: process.env.DOCUSIGN_PRIVATE_KEY_URI
};

export { port, secret, env, gcpConfig, docusignConfig, mongo };
