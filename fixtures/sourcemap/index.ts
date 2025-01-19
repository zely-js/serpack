import { emit } from './comsumer';
import { somethingWrong } from './something-wrong';

try {
  somethingWrong();
} catch (e) {
  emit(e, './fixtures/sourcemap/compiled.js.map');
}
