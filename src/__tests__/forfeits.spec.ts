import { describe, expect, it } from 'vitest';

import { directEncounterForfeits } from '../forfeits.js';

import type { CompletedRound, Player } from '@echecs/tournament';

const PLAYERS: Player[] = [
  { id: 'A', points: 1.5, rank: 2 },
  { id: 'B', points: 2, rank: 1 },
  { id: 'C', points: 1, rank: 4 },
  { id: 'D', points: 1.5, rank: 3 },
];

const ROUNDS: CompletedRound[] = [
  {
    byes: [],
    games: [
      { black: 'B', result: 'draw', white: 'A' },
      { black: 'D', result: 'black', white: 'C' },
    ],
  },
  {
    byes: [],
    games: [
      {
        black: 'D',
        forfeit: 'black',
        result: 'white',
        white: 'A',
      },
      { black: 'C', result: 'black', white: 'B' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'C', result: 'black', white: 'A' },
      { black: 'D', result: 'draw', white: 'B' },
    ],
  },
];

describe('directEncounterForfeits', () => {
  it('counts forfeit encounters as played (FIDE C.07 6.1.1 included)', () => {
    expect(directEncounterForfeits('A', ROUNDS, PLAYERS)).toBe(1);
  });

  it('scores a forfeit loss as 0 for the forfeiting player', () => {
    expect(directEncounterForfeits('D', ROUNDS, PLAYERS)).toBe(0);
  });
});
