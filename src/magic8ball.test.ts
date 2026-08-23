import { describe, it, expect } from 'vitest';
import {
  MAGIC_8_BALL_RESPONSE_KEYS,
  getRandomMagic8BallResponseKey,
} from './magic8ball';

describe('getRandomMagic8BallResponseKey', () => {
  it('returns one of the known response keys', () => {
    const responseKey = getRandomMagic8BallResponseKey();
    expect(MAGIC_8_BALL_RESPONSE_KEYS).toContain(responseKey);
  });
});
