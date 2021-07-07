import storage from '@connections/gcp/storage';
import { join } from 'path';
import { gcpConfig } from '@config/environment';

const gcpQueries = {
  signFileUrl: async (_, { filePath }, { user: { id } }) => {
    const parsedFilePath = join('user', id, `${Date.now()}-${filePath.replace(/[)(]/g, '')}`);

    const options = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes before URL expiration.
    };

    const [signedUrl] = await storage
      .bucket(gcpConfig.bucketName)
      .file(parsedFilePath)
      .getSignedUrl(options);

    return {
      signedUrl,
      fileUrl: `https://storage.cloud.google.com/${gcpConfig.bucketName}/${encodeURI(
        parsedFilePath
      )}`,
    };
  },
};

export default gcpQueries;
