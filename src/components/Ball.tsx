import { useTranslation } from 'react-i18next';
import {
  getVerdictForResponseKey,
  type Magic8BallResponseKey,
} from '../magic8ball';
import type { RevealStatus } from '../hooks/useRevealAnswer';

type BallProps = {
  status: RevealStatus;
  responseKey: Magic8BallResponseKey | null;
};

/**
 * The ball itself. The die stamps a short verdict; the full response
 * lives on the slip below, which is the live region.
 */
export function Ball({ status, responseKey }: BallProps) {
  const { t } = useTranslation();

  const isTurning = status === 'revealing';
  const isSettled = status === 'revealed' && responseKey !== null;

  return (
    <div
      className={[
        'ball',
        isTurning ? 'ball--turning' : '',
        isSettled ? 'ball--settled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="img"
      aria-label={t('app.ballAriaLabel')}
      aria-busy={isTurning}
    >
      <span className="ball__window">
        <span
          className={[
            'ball__die',
            isSettled ? 'ball__die--settled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {isTurning ? (
            <span className="ball__thinking">
              <span className="ball__dot" />
              <span className="ball__dot" />
              <span className="ball__dot" />
            </span>
          ) : isSettled ? (
            <span className="ball__verdict">
              {t(`verdicts.${getVerdictForResponseKey(responseKey)}`)}
            </span>
          ) : (
            <span className="ball__glyph">{t('app.ballDisplay')}</span>
          )}
        </span>
      </span>
    </div>
  );
}
