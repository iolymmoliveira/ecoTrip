import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R, _T = unknown> {
      toHaveTextContent(
        _text: string | RegExp,
        _options?: { normalizeWhitespace: boolean },
      ): R;
      toBeInTheDocument(): R;
      toBeInTheDOM(_container?: HTMLElement | SVGElement): R;
    }
  }
}

export {};
