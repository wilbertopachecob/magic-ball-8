import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAskKey } from './useAskKey';

function pressSpace(target: EventTarget = document.body) {
  const event = new KeyboardEvent('keydown', {
    code: 'Space',
    bubbles: true,
    cancelable: true,
  });
  target.dispatchEvent(event);
  return event;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('useAskKey', () => {
  it('asks when the space bar is pressed', () => {
    const onAsk = vi.fn();
    renderHook(() => useAskKey(onAsk));

    const event = pressSpace();

    expect(onAsk).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('ignores the space bar while a control is focused', () => {
    const onAsk = vi.fn();
    renderHook(() => useAskKey(onAsk));

    const button = document.createElement('button');
    document.body.appendChild(button);
    pressSpace(button);

    expect(onAsk).not.toHaveBeenCalled();
  });

  it('does nothing when disabled', () => {
    const onAsk = vi.fn();
    renderHook(() => useAskKey(onAsk, { enabled: false }));

    pressSpace();

    expect(onAsk).not.toHaveBeenCalled();
  });

  it('stops listening after unmount', () => {
    const onAsk = vi.fn();
    const { unmount } = renderHook(() => useAskKey(onAsk));

    unmount();
    pressSpace();

    expect(onAsk).not.toHaveBeenCalled();
  });
});
