import { describe, expect, it } from 'vitest';

import { directEncounter } from '../index.js';

import type { CompletedRound, Player } from '@echecs/tournament';

const PLAYERS: Player[] = [
  { id: 'A', points: 2.5, rank: 1 },
  { id: 'B', points: 1, rank: 3 },
  { id: 'C', points: 0, rank: 4 },
  { id: 'D', points: 2.5, rank: 2 },
];

const ROUNDS: CompletedRound[] = [
  {
    byes: [],
    games: [
      { black: 'B', result: 'white', white: 'A' },
      { black: 'D', result: 'black', white: 'C' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'D', result: 'draw', white: 'A' },
      { black: 'B', result: 'black', white: 'C' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'C', result: 'white', white: 'A' },
      { black: 'B', result: 'white', white: 'D' },
    ],
  },
];

describe('directEncounter', () => {
  it('returns points scored against tied players only', () => {
    expect(directEncounter('A', ROUNDS, PLAYERS)).toBe(0.5);
  });

  it('returns 0 when no one is tied with the player', () => {
    expect(directEncounter('B', ROUNDS, PLAYERS)).toBe(0);
  });

  it('handles player with no games', () => {
    expect(directEncounter('A', [], PLAYERS)).toBe(0);
  });

  it('averages multiple games against the same opponent (FIDE 6.1.2)', () => {
    const rounds: CompletedRound[] = [
      { byes: [], games: [{ black: 'B', result: 'white', white: 'A' }] },
      { byes: [], games: [{ black: 'B', result: 'black', white: 'A' }] },
    ];
    const players: Player[] = [
      { id: 'A', points: 1, rank: 1 },
      { id: 'B', points: 1, rank: 2 },
    ];
    expect(directEncounter('A', rounds, players)).toBe(0.5);
  });
});
