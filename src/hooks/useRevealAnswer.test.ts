import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRevealAnswer } from './useRevealAnswer';
import { REVEAL_DELAY_MS } from '../constants';

describe('useRevealAnswer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts in idle state with no response', () => {
    const { result } = renderHook(() => useRevealAnswer());

    expect(result.current.status).toBe('idle');
    expect(result.current.responseKey).toBeNull();
    expect(result.current.isRevealing).toBe(false);
  });

  it('enters revealing state immediately on reveal', () => {
    const { result } = renderHook(() => useRevealAnswer());

    act(() => {
      result.current.reveal();
    });

    expect(result.current.status).toBe('revealing');
    expect(result.current.isRevealing).toBe(true);
    expect(result.current.responseKey).toBeNull();
  });

  it('reveals a response after the delay', () => {
    const { result } = renderHook(() => useRevealAnswer());

    act(() => {
      result.current.reveal();
    });

    act(() => {
      vi.advanceTimersByTime(REVEAL_DELAY_MS);
    });

    expect(result.current.status).toBe('revealed');
    expect(result.current.responseKey).not.toBeNull();
    expect(result.current.isRevealing).toBe(false);
  });

  it('ignores reveal calls while already revealing', () => {
    const { result } = renderHook(() => useRevealAnswer());

    act(() => {
      result.current.reveal();
      result.current.reveal();
    });

    act(() => {
      vi.advanceTimersByTime(REVEAL_DELAY_MS);
    });

    expect(result.current.status).toBe('revealed');
  });
});
