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
