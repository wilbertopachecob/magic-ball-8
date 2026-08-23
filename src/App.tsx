import { Trans, useTranslation } from 'react-i18next';
import { useShake } from './hooks/useShake';
import { useIsMobile } from './hooks/useIsMobile';
import { useAskKey } from './hooks/useAskKey';
import { useRevealAnswer } from './hooks/useRevealAnswer';
import { LanguageSelector } from './components/LanguageSelector';
import { Ball } from './components/Ball';
import { AskAgainIcon, ShakeIcon } from './components/icons';
import './App.css';

export default function App() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { responseKey, status, reveal, isRevealing } = useRevealAnswer();

  useShake(reveal, { enabled: isMobile && !isRevealing });
  useAskKey(reveal, { enabled: !isRevealing });

  const isRevealed = status === 'revealed' && responseKey !== null;

  const askLabel = isRevealing
    ? t('app.askingButton')
    : isRevealed
      ? t('app.askAgainButton')
      : isMobile
        ? t('app.tapToAskButton')
        : t('app.askButton');

  return (
    <div className="page">
      <header className="masthead">
        <div className="wordmark">
          <span className="wordmark__mark" aria-hidden="true">
            8
          </span>
          <span className="wordmark__text">{t('app.title')}</span>
        </div>
        <LanguageSelector />
      </header>

      <main className="app">
        <div className="intro">
          <h1 className="intro__title">{t('app.headline')}</h1>
          <p className="intro__lede">
            {isMobile ? t('app.subtitleMobile') : t('app.subtitleDesktop')}
          </p>
        </div>

        <Ball status={status} responseKey={responseKey} />

        <div className="slip" aria-live="polite">
          {isRevealing && (
            <p className="slip__status">{t('app.revealingHint')}</p>
          )}

          {isRevealed && (
            <>
              <div className="slip__rule">
                <span className="slip__label">{t('app.slipLabel')}</span>
              </div>
              <p className="slip__answer">{t(`responses.${responseKey}`)}</p>
            </>
          )}
        </div>

        <div className="actions">
          {isMobile ? (
            <>
              <p className="hint hint--shake">
                <ShakeIcon />
                {t('app.shakePrompt')}
              </p>
              <button
                type="button"
                className="ask-button ask-button--secondary"
                onClick={reveal}
                disabled={isRevealing}
              >
                {askLabel}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="ask-button"
                onClick={reveal}
                disabled={isRevealing}
              >
                <AskAgainIcon className="ask-button__icon" />
                {askLabel}
              </button>
              <p className="hint">
                <Trans
                  i18nKey="app.keyboardHint"
                  components={{ key: <kbd className="key" /> }}
                />
              </p>
            </>
          )}
        </div>
      </main>

      <footer className="colophon">
        <span>{t('app.colophonAnswers')}</span>
        <span>{t('app.colophonShake')}</span>
      </footer>
    </div>
  );
}
