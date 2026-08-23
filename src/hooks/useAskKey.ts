import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR =
  'button, a, input, textarea, select, [contenteditable="true"]';

export type UseAskKeyOptions = {
  enabled?: boolean;
};

/**
 * Asks the ball when the space bar is pressed outside a control, so the
 * page is usable from the keyboard without hunting for the button.
 */
export function useAskKey(
  onAsk: () => void,
  options: UseAskKeyOptions = {},
): void {
  const { enabled = true } = options;
  const onAskRef = useRef(onAsk);

  useEffect(() => {
    onAskRef.current = onAsk;
  }, [onAsk]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || event.defaultPrevented) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (
        target instanceof Element &&
        target.closest(INTERACTIVE_SELECTOR) !== null
      ) {
        return;
      }

      event.preventDefault();
      onAskRef.current();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled]);
}
