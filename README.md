# Direct Encounter

[![npm](https://img.shields.io/npm/v/@echecs/direct-encounter)](https://www.npmjs.com/package/@echecs/direct-encounter)
[![Coverage](https://codecov.io/gh/echecsjs/direct-encounter/branch/main/graph/badge.svg)](https://codecov.io/gh/echecsjs/direct-encounter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Spec](https://img.shields.io/badge/Spec-FIDE-green.svg)](SPEC.md)

**Direct Encounter** computes the Direct Encounter tiebreak — a FIDE method that
compares players' scores from games played only against each other — following
the
[FIDE Tiebreak Regulations](https://handbook.fide.com/chapter/TieBreakRegulations032026)
(section 6). TypeScript, zero runtime dependencies.

## Installation

```bash
npm install @echecs/direct-encounter
```

## Quick Start

```typescript
import { directEncounter } from '@echecs/direct-encounter';
import type { Game, GameKind, Player } from '@echecs/direct-encounter';

// Players A, B, C are tied on points
const players = [{ id: 'A' }, { id: 'B' }, { id: 'C' }];
// games[n] = round n+1; Game has no `round` field
const games: Game[][] = [
  [{ black: 'B', result: 1, white: 'A' }], // round 1
  [{ black: 'C', result: 0.5, white: 'A' }], // round 2
  [{ black: 'C', result: 0, white: 'B' }], // round 3
];

const score = directEncounter('A', games, players);
// Returns A's score from games played against other tied players (B and C)
```

## API

### `directEncounter(playerId, games, players)`

```typescript
directEncounter(playerId: string, games: Game[][], players: Player[]): number
```

Returns the total points `playerId` scored against the players in the `players`
array (the tied group). Pass the subset of players who share the same tournament
score as `playerId`.

Round order follows array position: `games[0]` = round 1, `games[1]` = round 2,
etc. The optional `kind?: GameKind` field identifies unplayed rounds
(`'forfeit-loss' | 'forfeit-win' | 'full-bye' | 'half-bye' | 'pairing-bye' | 'zero-bye'`);
the function excludes all byes from the score.

Also exported as `tiebreak` — an alias for `directEncounter`:

```typescript
import { tiebreak } from '@echecs/direct-encounter';
```

When all tied players have identical Direct Encounter scores (the common case in
Swiss), this tiebreak is inconclusive. Apply the next tiebreak in the ordering.

### Types

```typescript
import type { Game, GameKind, Player, Result } from '@echecs/direct-encounter';
```

| Type       | Shape / Values                                                                               |
| ---------- | -------------------------------------------------------------------------------------------- |
| `Player`   | `{ id: string }`                                                                             |
| `Result`   | `0 \| 0.5 \| 1`                                                                              |
| `Game`     | `{ black: string; white: string; result: Result; kind?: GameKind }`                          |
| `GameKind` | `'forfeit-loss' \| 'forfeit-win' \| 'full-bye' \| 'half-bye' \| 'pairing-bye' \| 'zero-bye'` |

## Contributing

Contributions are welcome. Please open an issue at
[github.com/echecsjs/direct-encounter/issues](https://github.com/echecsjs/direct-encounter/issues).
