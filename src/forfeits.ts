import { gamesForPlayer, scoreFor } from './utilities.js';

import type { Tiebreak } from '@echecs/tournament';

const directEncounterForfeits: Tiebreak = (player, rounds, players) => {
  const playerData = players.find((p) => p.id === player);
  if (playerData === undefined) {
    return 0;
  }
  const tiedPlayerIds = new Set(
    players
      .filter((p) => p.id !== player && p.points === playerData.points)
      .map((p) => p.id),
  );

  const byOpponent = new Map<string, number[]>();
  for (const g of gamesForPlayer(player, rounds)) {
    const opponent = g.white === player ? g.black : g.white;
    if (tiedPlayerIds.has(opponent)) {
      const points = scoreFor(player, g);
      const scores = byOpponent.get(opponent);
      if (scores) {
        scores.push(points);
      } else {
        byOpponent.set(opponent, [points]);
      }
    }
  }

  let sum = 0;
  for (const scores of byOpponent.values()) {
    sum += scores.reduce((a, b) => a + b, 0) / scores.length;
  }
  return sum;
};

export { directEncounterForfeits, directEncounterForfeits as tiebreak };

export type {
  Bye,
  CompletedRound,
  Game,
  Pairing,
  Player,
} from '@echecs/tournament';
