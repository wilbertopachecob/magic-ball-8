import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useShake } from './useShake';

describe('useShake', () => {
  let listeners: Map<string, EventListener>;

  beforeEach(() => {
    listeners = new Map();
    vi.spyOn(window, 'addEventListener').mockImplementation((type, handler) => {
      listeners.set(type, handler as EventListener);
    });
    vi.spyOn(window, 'removeEventListener').mockImplementation((type) => {
      listeners.delete(type);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const dispatchMotion = (acceleration: { x: number; y: number; z: number }) => {
    const handler = listeners.get('devicemotion');
    const event = new Event('devicemotion') as DeviceMotionEvent;
    Object.defineProperty(event, 'accelerationIncludingGravity', {
      value: acceleration,
      configurable: true,
    });
    handler?.(event);
  };

  it('registers a devicemotion listener when enabled', () => {
    const onShake = vi.fn();
    renderHook(() => useShake(onShake));

    expect(window.addEventListener).toHaveBeenCalledWith(
      'devicemotion',
      expect.any(Function),
    );
  });

  it('calls onShake when acceleration delta exceeds threshold', () => {
    vi.useFakeTimers();
    const onShake = vi.fn();

    renderHook(() => useShake(onShake, { threshold: 10, cooldownMs: 500 }));

    dispatchMotion({ x: 0, y: 0, z: 0 });
    dispatchMotion({ x: 10, y: 10, z: 10 });

    expect(onShake).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('respects cooldown between shakes', () => {
    vi.useFakeTimers();
    const onShake = vi.fn();

    renderHook(() => useShake(onShake, { threshold: 10, cooldownMs: 1000 }));

    dispatchMotion({ x: 0, y: 0, z: 0 });
    dispatchMotion({ x: 10, y: 10, z: 10 });
    dispatchMotion({ x: 0, y: 0, z: 0 });
    dispatchMotion({ x: 10, y: 10, z: 10 });

    expect(onShake).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1001);
    });

    dispatchMotion({ x: 0, y: 0, z: 0 });
    dispatchMotion({ x: 10, y: 10, z: 10 });

    expect(onShake).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it('does not register listener when disabled', () => {
    const onShake = vi.fn();
    renderHook(() => useShake(onShake, { enabled: false }));

    expect(window.addEventListener).not.toHaveBeenCalled();
  });

  it('does not call onShake while paused', () => {
    const onShake = vi.fn();

    renderHook(() => useShake(onShake, { threshold: 10, paused: true }));

    dispatchMotion({ x: 0, y: 0, z: 0 });
    dispatchMotion({ x: 10, y: 10, z: 10 });

    expect(onShake).not.toHaveBeenCalled();
  });

  it('does not false-trigger after pause ends', () => {
    vi.useFakeTimers();
    const onShake = vi.fn();

    const { rerender } = renderHook(
      ({ paused }) => useShake(onShake, { threshold: 10, cooldownMs: 0, paused }),
      { initialProps: { paused: false } },
    );

    dispatchMotion({ x: 0, y: 0, z: 0 });
    dispatchMotion({ x: 10, y: 10, z: 10 });
    expect(onShake).toHaveBeenCalledTimes(1);

    rerender({ paused: true });
    dispatchMotion({ x: 20, y: 20, z: 20 });
    dispatchMotion({ x: 30, y: 30, z: 30 });

    rerender({ paused: false });
    dispatchMotion({ x: 31, y: 31, z: 31 });

    expect(onShake).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1);
    });

    dispatchMotion({ x: 0, y: 0, z: 0 });
    dispatchMotion({ x: 10, y: 10, z: 10 });

    expect(onShake).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it('keeps the listener attached while paused', () => {
    const onShake = vi.fn();

    const { rerender } = renderHook(
      ({ paused }) => useShake(onShake, { paused }),
      { initialProps: { paused: false } },
    );

    expect(window.addEventListener).toHaveBeenCalledTimes(1);

    rerender({ paused: true });

    expect(window.removeEventListener).not.toHaveBeenCalled();
    expect(window.addEventListener).toHaveBeenCalledTimes(1);
  });
});
