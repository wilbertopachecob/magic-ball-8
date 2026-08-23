import { useEffect, useRef } from 'react';

const DEFAULT_THRESHOLD = 15;
const DEFAULT_COOLDOWN_MS = 1000;

export type UseShakeOptions = {
  threshold?: number;
  cooldownMs?: number;
  enabled?: boolean;
};

type Acceleration = {
  x: number;
  y: number;
  z: number;
};

/** Detects device shake via DeviceMotionEvent and calls `onShake`. */
export function useShake(
  onShake: () => void,
  options: UseShakeOptions = {},
): void {
  const {
    threshold = DEFAULT_THRESHOLD,
    cooldownMs = DEFAULT_COOLDOWN_MS,
    enabled = true,
  } = options;

  const lastShakeAt = useRef(0);
  const lastAcceleration = useRef<Acceleration>({ x: 0, y: 0, z: 0 });
  const onShakeRef = useRef(onShake);

  useEffect(() => {
    onShakeRef.current = onShake;
  }, [onShake]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return undefined;
    }

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) {
        return;
      }

      const x = acceleration.x ?? 0;
      const y = acceleration.y ?? 0;
      const z = acceleration.z ?? 0;
      const deltaX = Math.abs(x - lastAcceleration.current.x);
      const deltaY = Math.abs(y - lastAcceleration.current.y);
      const deltaZ = Math.abs(z - lastAcceleration.current.z);
      const delta = deltaX + deltaY + deltaZ;

      lastAcceleration.current = { x, y, z };

      const now = Date.now();
      if (delta > threshold && now - lastShakeAt.current > cooldownMs) {
        lastShakeAt.current = now;
        onShakeRef.current();
      }
    };

    window.addEventListener('devicemotion', handleMotion);

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [enabled, threshold, cooldownMs]);
}
