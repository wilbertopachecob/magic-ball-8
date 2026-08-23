import { useTranslation } from 'react-i18next';
import { useShake } from './hooks/useShake';
import { useIsMobile } from './hooks/useIsMobile';
import { useRevealAnswer } from './hooks/useRevealAnswer';
import { LanguageSelector } from './components/LanguageSelector';
import './App.css';

export default function App() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { responseKey, status, reveal, isRevealing } = useRevealAnswer();

  useShake(reveal, { enabled: isMobile && !isRevealing });

  const isRevealed = status === 'revealed' && responseKey !== null;

  return (
    <div className="page">
      <header className="header">
        <LanguageSelector />
      </header>

      <main className="app">
        <h1>{t('app.title')}</h1>
        <p className="subtitle">
          {isMobile ? t('app.subtitleMobile') : t('app.subtitleDesktop')}
        </p>

        <div
          className={[
            'ball',
            isRevealing ? 'ball--revealing' : '',
            isRevealed ? 'ball--settled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-label={t('app.ballAriaLabel')}
          aria-busy={isRevealing}
          role="img"
        >
          <span
            className={[
              'ball__window',
              isRevealing ? 'ball__window--revealing' : '',
              isRevealed ? 'ball__window--revealed' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {isRevealing ? (
              <span className="ball__thinking" aria-hidden="true">
                <span className="ball__dot" />
                <span className="ball__dot" />
                <span className="ball__dot" />
              </span>
            ) : isRevealed ? (
              <span className="ball__answer">{t(`responses.${responseKey}`)}</span>
            ) : (
              t('app.ballDisplay')
            )}
          </span>
        </div>

        {isRevealing && (
          <p className="status status--revealing" aria-live="polite">
            {t('app.revealingHint')}
          </p>
        )}

        {isRevealed && (
          <p className="response response--revealed" aria-live="polite">
            {t(`responses.${responseKey}`)}
          </p>
        )}

        {isMobile ? (
          <p className="hint hint--mobile">
            <span className="hint__icon" aria-hidden="true">
              📱
            </span>
            {t('app.shakeHint')}
          </p>
        ) : (
          <>
            <button
              type="button"
              className="ask-button"
              onClick={reveal}
              disabled={isRevealing}
            >
              {isRevealing ? t('app.askingButton') : t('app.askButton')}
            </button>
            <p className="hint">{t('app.desktopHint')}</p>
          </>
        )}
      </main>
    </div>
  );
}
