import { createMediaQueryList } from '@tests/utils';

export const MOCK_WINDOW = {
  addEventListener: (): void => {},
  removeEventListener: (): void => {},
  matchMedia: (query: string): MediaQueryList => createMediaQueryList('some query'),
};
