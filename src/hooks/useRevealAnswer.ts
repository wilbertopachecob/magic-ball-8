import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getRandomMagic8BallResponseKey,
  type Magic8BallResponseKey,
} from '@/magic8ball.constants';
import { REVEAL_DELAY_MS } from '@/constants';

export type RevealStatus = 'idle' | 'revealing' | 'revealed';

export function useRevealAnswer() {
  const [responseKey, setResponseKey] = useState<Magic8BallResponseKey | null>(
    null,
  );
  const [status, setStatus] = useState<RevealStatus>('idle');
  const isRevealingRef = useRef(false);
  const revealTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (revealTimeoutRef.current !== null) {
        window.clearTimeout(revealTimeoutRef.current);
      }
    };
  }, []);

  const reveal = useCallback(() => {
    if (isRevealingRef.current) {
      return;
    }

    isRevealingRef.current = true;
    setStatus('revealing');
    setResponseKey(null);

    const nextKey = getRandomMagic8BallResponseKey();

    revealTimeoutRef.current = window.setTimeout(() => {
      setResponseKey(nextKey);
      setStatus('revealed');
      isRevealingRef.current = false;
      revealTimeoutRef.current = null;
    }, REVEAL_DELAY_MS);
  }, []);

  return {
    responseKey,
    status,
    reveal,
    isRevealing: status === 'revealing',
  };
}
