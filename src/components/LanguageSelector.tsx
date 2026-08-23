import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', labelKey: 'language.en' },
  { code: 'es', labelKey: 'language.es' },
] as const;

export function LanguageSelector() {
  const { t, i18n } = useTranslation();

  return (
    <div className="language-selector" role="group" aria-label={t('language.label')}>
      {LANGUAGES.map(({ code, labelKey }) => {
        const isActive = i18n.language.startsWith(code);

        return (
          <button
            key={code}
            type="button"
            className={`language-selector__button ${isActive ? 'language-selector__button--active' : ''}`}
            onClick={() => {
              void i18n.changeLanguage(code);
            }}
            aria-pressed={isActive}
          >
            {t(labelKey)}
          </button>
        );
      })}
    </div>
  );
}
