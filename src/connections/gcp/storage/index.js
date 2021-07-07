import { Storage } from '@google-cloud/storage';
import { gcpConfig } from 'config/environment';

const storage = new Storage({
  keyFilename: gcpConfig.credentialsUrl,
});

export default storage;
