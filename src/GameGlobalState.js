import { createGlobalState } from "react-hooks-global-state";
import Game from "./models/Game";

export const { GlobalStateProvider, useGlobalState } = createGlobalState({
  game: Game.generate(6)
});
