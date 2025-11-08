import { civilizations } from './civilizations';
import { traditions } from './traditions';
import { paintingTechniques } from './paintingTechniques';
import { inspirations } from './inspirations';
import { evolution } from './evolution';
import { sculptureTechniques } from './sculptureTechniques';
import { sculptureHistory } from './sculptureHistory';
import { sculptureEvolution } from './sculptureEvolution';
import { caveArts } from './caveArts';

export const artStories = {
  ...civilizations,
  ...traditions,
  ...paintingTechniques,
  ...inspirations,
  ...evolution,
  ...sculptureTechniques,
  ...sculptureHistory,
  ...sculptureEvolution,
  ...caveArts
};