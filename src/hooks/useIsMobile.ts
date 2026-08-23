import { isMobile } from 'react-device-detect';

/** Returns true when the user is on a mobile device. */
export function useIsMobile(): boolean {
  return isMobile;
}
