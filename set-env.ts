const { writeFile } = require('fs');
// Configure Angular `environment.ts` file path
const targetDevPath = './src/environments/environment.ts';
const targetProdPath = './src/environments/environment.prod.ts';

require('dotenv').config();
// `environment.ts` file structure
const envConfigDevFile = `export const environment = {
   rapidApiKey: '${process.env.rapidApiKey}', 
   production: false,
   apiUrl: 'http://localhost:4000'
};
`;

const envConfigProdFile = `export const environment = {
  rapidApiKey: '${process.env.rapidApiKey}', 
  production: true,
  apiUrl: ''
};
`;

writeFile(targetDevPath, envConfigDevFile, function (err:any) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(`Angular environment.ts file generated correctly at ${targetDevPath} \n`);
   }
});

writeFile(targetProdPath, envConfigProdFile, function (err:any) {
  if (err) {
      throw console.error(err);
  } else {
      console.log(`Angular environment.ts file generated correctly at ${targetProdPath} \n`);
  }
});