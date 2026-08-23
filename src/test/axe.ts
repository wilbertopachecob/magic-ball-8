import { axe as runAxe } from 'vitest-axe';

/**
 * Run axe against a rendered container in jsdom.
 * Color contrast needs canvas APIs that jsdom does not implement.
 */
export async function axe(container: Element) {
  return runAxe(container, {
    rules: {
      'color-contrast': { enabled: false },
    },
  });
}
