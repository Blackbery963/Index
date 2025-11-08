import { westernArtists } from "./westernArtists.js";
import { artMovements } from "./artMovements.js";
import { indianArtists } from "./indianArtists.js";
import { artistPhilosophies } from "./artistPhilosophies.js";
import { generalArtQuestions } from "./generalArtQuestions.js";

export const artHistoryData = {
  ...westernArtists,
  ...artMovements,
  ...indianArtists,
  ...artistPhilosophies,
  ...generalArtQuestions
};
