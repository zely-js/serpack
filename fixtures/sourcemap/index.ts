import { emit } from './comsumer';
import { somethingWrong } from './something-wrong';

import jsonFile from '../../package.json';

try {
  console.log(`JSON Data: ${JSON.stringify(jsonFile)}!`);
  somethingWrong();
} catch (e) {
  emit(e, './fixtures/sourcemap/compiled.js.map');
}
