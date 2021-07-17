import { docusignConfig } from '@config/environment';
import docusignMethods from '@utils/docusignMethods';
import fs from 'fs';

const docusignQueries = {
  docusignCreateOAuth: async () => docusignMethods.getAuthorizationUri(
    docusignConfig.integrationKey,
    ['signature', 'impersonation'],
    docusignConfig.redirectUri,
    'code'
  ),
  docusignGenerateAccessToken: async () => {
    const assertion = docusignMethods.generateJWT(
      ['signature'],
      fs.readFileSync(docusignConfig.privateKeyUri),
      60 * 60 * 1000, // 1 hour = minutes * seconds * milliseconds
      docusignConfig.userId
    )

    const { data } = await docusignMethods.generateAccessToken(assertion);

    return data.access_token ? data.access_token : new Error('Ha habido un error generando el acceso con DocuSign!')
  },
  docusignGetUserInfo: async (_, { accessToken }) => {
    const { data } = await docusignMethods.getUserInfo(accessToken);
    return data;
  }
};

export default docusignQueries;