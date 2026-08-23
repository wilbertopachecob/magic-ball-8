import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '../i18n';
import { axe } from '@/test/axe';
import { Ball } from './Ball';

describe('Ball accessibility', () => {
  it('has no violations while idle', async () => {
    const { container } = render(<Ball status="idle" responseKey={null} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations while revealing', async () => {
    const { container } = render(<Ball status="revealing" responseKey={null} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations when settled with a response', async () => {
    const { container } = render(
      <Ball status="revealed" responseKey="IT_IS_CERTAIN" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
