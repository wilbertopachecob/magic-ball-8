import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import './i18n';
import { axe } from './test/axe';
import App from './App';
import { REVEAL_DELAY_MS } from './constants';

const mockIsMobile = vi.hoisted(() => ({ value: false }));

vi.mock('./hooks/useIsMobile', () => ({
  useIsMobile: () => mockIsMobile.value,
}));

describe('App accessibility', () => {
  beforeEach(() => {
    mockIsMobile.value = false;
  });

  it('has no violations on desktop in the idle state', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations on mobile in the idle state', async () => {
    mockIsMobile.value = true;

    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no violations after an answer is revealed on desktop', async () => {
    vi.useFakeTimers();

    const { container, getByRole } = render(<App />);

    fireEvent.click(getByRole('button', { name: 'Ask the ball' }));

    await act(async () => {
      vi.advanceTimersByTime(REVEAL_DELAY_MS);
    });

    vi.useRealTimers();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
