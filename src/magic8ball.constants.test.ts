import { describe, it, expect } from 'vitest';
import {
  MAGIC_8_BALL_RESPONSE_KEYS,
  MAGIC_8_BALL_VERDICTS,
  getRandomMagic8BallResponseKey,
  getVerdictForResponseKey,
} from './magic8ball.constants';

describe('getRandomMagic8BallResponseKey', () => {
  it('returns one of the known response keys', () => {
    const responseKey = getRandomMagic8BallResponseKey();
    expect(MAGIC_8_BALL_RESPONSE_KEYS).toContain(responseKey);
  });
});

describe('getVerdictForResponseKey', () => {
  it('maps every response key to a known verdict', () => {
    for (const responseKey of MAGIC_8_BALL_RESPONSE_KEYS) {
      expect(MAGIC_8_BALL_VERDICTS).toContain(
        getVerdictForResponseKey(responseKey),
      );
    }
  });

  it('keeps the classic 10 / 5 / 5 split', () => {
    const counts = MAGIC_8_BALL_RESPONSE_KEYS.reduce<Record<string, number>>(
      (totals, responseKey) => {
        const verdict = getVerdictForResponseKey(responseKey);
        totals[verdict] = (totals[verdict] ?? 0) + 1;
        return totals;
      },
      {},
    );

    expect(counts).toEqual({ YES: 10, MAYBE: 5, NO: 5 });
  });
});
