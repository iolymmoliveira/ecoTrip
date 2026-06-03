/// <reference types="jest" />
import { render, screen } from '@testing-library/react';
import { expect as jestExpect } from '@jest/globals';
declare const expect: typeof jestExpect;
import '@testing-library/jest-dom';
import { QueryProvider } from './QueryProvider';

describe('QueryProvider', () => {
  it('should render children elements inside the TanStack Query context', () => {
    render(
      <QueryProvider>
        <div data-testid="child-element">Conteúdo Seguro do App</div>
      </QueryProvider>,
    );

    const child = screen.getByTestId('child-element');
    expect(child).not.toBeNull();
    expect(child.textContent).toBe('Conteúdo Seguro do App');
  });
});
