import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

const mockIsMobile = vi.hoisted(() => ({ value: false }));

vi.mock('react-device-detect', () => ({
  get isMobile() {
    return mockIsMobile.value;
  },
}));

import { useIsMobile } from './useIsMobile';

describe('useIsMobile', () => {
  it('returns false on desktop', () => {
    mockIsMobile.value = false;

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true on mobile', () => {
    mockIsMobile.value = true;

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });
});
