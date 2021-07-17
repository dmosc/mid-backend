import axios from 'axios';
import docusign from 'docusign-esign';
import { docusignConfig } from '@config/environment';
import jwt from 'jsonwebtoken';

/*
  Methods to mimic/imitate docusign-esign methods since official ones are buggy,
  and outdated.

  A sequential execution of these methods yields the final user information which is then used to
  generate envelopes and emit them to different users.
*/

const docusignMethods = {
  getAuthorizationUri: (clientId, scopes, redirectUri, responseType, state) => {
    const formattedScopes = scopes.join(encodeURI(' '));
    return `https://${docusignConfig.basePath}/oauth/auth?response_type=${responseType}&scope=${formattedScopes}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}${state ? `&state=${state}` : ''}`;
  },
  generateJWT: (scopes, privateKey, expiresIn, userId) => {
    const now = Math.floor(Date.now() / 1000); // Time in milliseconds
    const jwtPayload = {
      iss: docusignConfig.integrationKey,
      sub: userId,
      aud: docusignConfig.basePath,
      iat: now,
      exp: now + expiresIn,
      scope: scopes.join(' ')
    };

    return jwt.sign(jwtPayload, privateKey, { algorithm: 'RS256' });
  },
  generateAccessToken: async (assertion) => axios.post(`https://${docusignConfig.basePath}/oauth/token`, {
    'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion // The encoded value of the created JWT.
  }, {
    headers: {
      'Cache-Control': 'no-store',
      'Pragma': 'no-cache'
    }
  }),
  getUserInfo: async (accessToken) => {
    const { data } = await axios.get(`https://${docusignConfig.basePath}/oauth/userinfo`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache'
      }
    });

    console.log(data);
    return data;
  },
  buildEnvelope: (documents, accessToken) => {
    const envelope = new docusign.EnvelopeDefinition();
    console.log(envelope);
  }
};

export default docusignMethods;