import { type TestingLibraryMatchers } from '@testing-library/jest-dom/types/matchers';
import { type expect } from '@jest/globals';

declare module '@jest/expect' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface Matchers<
    R extends void | Promise<void>,
    _T = unknown,
  > extends TestingLibraryMatchers<
    ReturnType<typeof expect.stringContaining>,
    R
  > {}
  /* eslint-enable @typescript-eslint/no-empty-object-type */
}

declare module 'expect' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface Matchers<
    R extends void | Promise<void>,
    _T = unknown,
  > extends TestingLibraryMatchers<
    ReturnType<typeof expect.stringContaining>,
    R
  > {}
  /* eslint-enable @typescript-eslint/no-empty-object-type */
}

export {};
