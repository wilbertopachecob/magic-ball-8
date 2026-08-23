import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import i18n from '../i18n';
import { axe } from '../test/axe';
import { LanguageSelector } from './LanguageSelector';

describe('LanguageSelector accessibility', () => {
  it('has no violations in English', async () => {
    await i18n.changeLanguage('en');

    const { container } = render(<LanguageSelector />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations in Spanish', async () => {
    await i18n.changeLanguage('es');

    const { container } = render(<LanguageSelector />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
