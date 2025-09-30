import { emit } from '../sourcemap/comsumer';
import { somethingWrong } from './something-wrong';

import jsonFile from '../../package.json';

try {
  console.log(`JSON Data: ${JSON.stringify(jsonFile)}!`);
  somethingWrong();
} catch (e) {
  emit(e, './fixtures/sourcemap-plugin/compiled.js.map');
}
