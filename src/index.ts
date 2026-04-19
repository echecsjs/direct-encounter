import { gamesForPlayer, score } from './utilities.js';

import type { Game, Player } from './types.js';

function directEncounter(
  player: string,
  games: Game[][],
  players: Player[],
): number {
  const playerScore = score(player, games);
  const tiedPlayerIds = new Set(
    players
      .filter((p) => p.id !== player && score(p.id, games) === playerScore)
      .map((p) => p.id),
  );

  const byOpponent = new Map<string, number[]>();
  for (const g of gamesForPlayer(player, games)) {
    if (g.black === g.white) {
      continue;
    }
    const opponent = g.white === player ? g.black : g.white;
    if (tiedPlayerIds.has(opponent)) {
      const points = g.white === player ? g.result : 1 - g.result;
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
}

export { directEncounter, directEncounter as tiebreak };

export type { Game, GameKind, Player, Result } from './types.js';
