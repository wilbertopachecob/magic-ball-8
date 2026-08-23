/** Response keys for the classic Magic 8 Ball (20 total). */
export const MAGIC_8_BALL_RESPONSE_KEYS = [
  'IT_IS_CERTAIN',
  'IT_IS_DECIDEDLY_SO',
  'WITHOUT_A_DOUBT',
  'YES_DEFINITELY',
  'YOU_MAY_RELY_ON_IT',
  'AS_I_SEE_IT_YES',
  'MOST_LIKELY',
  'OUTLOOK_GOOD',
  'YES',
  'SIGNS_POINT_TO_YES',
  'REPLY_HAZY_TRY_AGAIN',
  'ASK_AGAIN_LATER',
  'BETTER_NOT_TELL_YOU_NOW',
  'CANNOT_PREDICT_NOW',
  'CONCENTRATE_AND_ASK_AGAIN',
  'DONT_COUNT_ON_IT',
  'MY_REPLY_IS_NO',
  'MY_SOURCES_SAY_NO',
  'OUTLOOK_NOT_SO_GOOD',
  'VERY_DOUBTFUL',
] as const;

export type Magic8BallResponseKey = (typeof MAGIC_8_BALL_RESPONSE_KEYS)[number];

export function getRandomMagic8BallResponseKey(): Magic8BallResponseKey {
  return MAGIC_8_BALL_RESPONSE_KEYS[
    Math.floor(Math.random() * MAGIC_8_BALL_RESPONSE_KEYS.length)
  ];
}

/** The three verdict groups stamped on the die, in canonical order. */
export const MAGIC_8_BALL_VERDICTS = ['YES', 'MAYBE', 'NO'] as const;

export type Magic8BallVerdict = (typeof MAGIC_8_BALL_VERDICTS)[number];

/**
 * The classic split: 10 affirmative, 5 non-committal, 5 negative.
 * The die shows this; the slip shows the full response.
 */
const VERDICT_BY_RESPONSE_KEY: Record<
  Magic8BallResponseKey,
  Magic8BallVerdict
> = {
  IT_IS_CERTAIN: 'YES',
  IT_IS_DECIDEDLY_SO: 'YES',
  WITHOUT_A_DOUBT: 'YES',
  YES_DEFINITELY: 'YES',
  YOU_MAY_RELY_ON_IT: 'YES',
  AS_I_SEE_IT_YES: 'YES',
  MOST_LIKELY: 'YES',
  OUTLOOK_GOOD: 'YES',
  YES: 'YES',
  SIGNS_POINT_TO_YES: 'YES',
  REPLY_HAZY_TRY_AGAIN: 'MAYBE',
  ASK_AGAIN_LATER: 'MAYBE',
  BETTER_NOT_TELL_YOU_NOW: 'MAYBE',
  CANNOT_PREDICT_NOW: 'MAYBE',
  CONCENTRATE_AND_ASK_AGAIN: 'MAYBE',
  DONT_COUNT_ON_IT: 'NO',
  MY_REPLY_IS_NO: 'NO',
  MY_SOURCES_SAY_NO: 'NO',
  OUTLOOK_NOT_SO_GOOD: 'NO',
  VERY_DOUBTFUL: 'NO',
};

export function getVerdictForResponseKey(
  responseKey: Magic8BallResponseKey,
): Magic8BallVerdict {
  return VERDICT_BY_RESPONSE_KEY[responseKey];
}
