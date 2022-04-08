import { env } from "./.env";

export const environment = {
  production: true,
  version: env.npm_package_version,
  //serverUrl: '',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
  Api_Endpoint: 'https://localhost:44347/api/',  
  Api_Mock_Endpoint: 'https://localhost:44347/api/',
};
