// artTechniques.js (merged file)
import { drawing } from './drawing';
import { painting } from './painting';
import { colorTheory } from './colorTheory';
import { digitalArt } from './digitalArt';
import { sculpture3D } from './sculpture3D';
import { printmaking } from './printmaking';
import { photography } from './photography';
import { mixedMedia } from './mixedMedia';
import { advancedTechniques } from './advancedTechniques';

export const artTechniques = {
  ...drawing,
  ...painting,
  ...colorTheory,
  ...digitalArt,
  ...sculpture3D,
  ...printmaking,
  ...photography,
  ...mixedMedia,
  ...advancedTechniques
};