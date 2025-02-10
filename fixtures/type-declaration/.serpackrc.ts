import { join } from 'path';
import { TypeDeclaration } from 'serpack-declaration';

export default <import('serpack').Options>{
  compilerOptions: {
    type: process.argv.includes('--script') ? 'script' : 'module',
    plugins: [TypeDeclaration(join(__dirname, 'types'))],
  },
};
